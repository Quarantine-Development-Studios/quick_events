import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Event from './resources/event.js';
import './CalendarPane.css';

const CalendarPane = (props) => {
    const [currentEvents, setCurrentEvents] = useState(null)
    const [inquiries, setInquiries] = useState(null);
    const [calendar, setCalendar] = useState(null);

    let calendarUpdate = true;

    if(inquiries !== props.inquiries){
        console.log('rendering inquiries')
        setInquiries(props.inquiries);
        setTimeout(() => {
            setCurrentEvents(generateCalendarEvents())
            calendarUpdate = true;
        }, 1000);
    }


    const handleDateSelect = (selectInfo) => {
        prompt(selectInfo.startStr)
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection
    }

    const handleEvents = (events) => {
        setCurrentEvents(events);
    }

    const  renderEventContent = (eventInfo) => {
        return (
            <>
                <b className="cal-popup-disp-time">{eventInfo.timeText}</b>
                <i className="cal-popup-disp-item">{eventInfo.event.title}</i>
            </>
        )
    }

    const generateCalendarEvents = () => {
        const events = [];

        if(props.inquiries){
            for(let i = 0; i < props.inquiries.length; i++){
                const target = props.inquiries[i];
                if(target){
                    const startDate = target.eventDate + 'T' + target.startTime + ':00';
                    const stopDate = target.eventDate + 'T' + target.stopTime + ':00';

                    events.push(Event(target.id, target.eventTitle, startDate, stopDate, 'lead'))
                }
            }
        }

        if(events[0]){
            return events;
        } else {
            return false;
        }
    }
    

    if(calendarUpdate){
        calendarUpdate = false;
        setCalendar(
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
    
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
        )
    }

    return (
        <div className='CalendarPane App-Window'>
            <div className='CalendarPane-basicCalendar-container'>
                {calendar}
            </div>
        </div>
    )
}
    
export default CalendarPane;