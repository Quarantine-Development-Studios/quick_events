import React from 'react';
import React_Custom, { Definitions } from '../../../CustomLibrary/ReactComponent_Custom.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceAreaColumns from './resources/resourceAreaColumns.js';
import Event from '../../../CustomLibrary/Definitions/event.js';
import './CalendarPane.css';

const CalendarPane = (props) => {    


    let events = null;

    //#region functions
    const generateCalendarEvents = (inquiries) => {
        const events = [];

        if(inquiries){
            for(let i = 0; i < inquiries.length; i++){
                const target = inquiries[i];
                if(target){
                    const startDate = target.eventDate + 'T' + target.startTime + ':00';
                    const stopDate = target.eventDate + 'T' + target.stopTime + ':00';

                    events.push(new Definitions.Event(target.id, target.eventTitle, startDate, stopDate, inquiries[i].eventStatus))
                }
            }
        }

        if(events[0]){
            return events;
        } else {
            return false;
        }
    }

    const handleDateSelect = (selectInfo) => {
        
        prompt(selectInfo.startStr)
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection
    }

    const handleEvents = (events) => {

    }

    const  renderEventContent = (eventInfo) => {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            } else if (i > 12) {
                i = i - 12;
            }
            return i;
          }
        
        
        const start = eventInfo.event.start; //date object
        const end = eventInfo.event.end; //date object

        const sHour = addZero(start.getHours());
        const sMin = addZero(start.getMinutes());
        const sString = sHour + ':' + sMin

        let eString = '';

        if(end){
            const eHour = addZero(end.getHours());
            const eMin  = addZero(end.getMinutes());
            eString = '-' + eHour + ':' + eMin;
        }

        return (
            <>
                <b className="cal-popup-disp-time">{sString +  eString}</b>
                <i className="cal-popup-disp-item">{eventInfo.event.title}</i>
            </>
        )
    }

    //#endregion

    events = generateCalendarEvents(props.inquiries);
    
    return (
        <div className='CalendarPane-basicCalendar-container'>
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
                events={events} // alternatively, use the `events` setting to fetch from a feed
                eventDisplay='list'
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
    
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />

            {React_Custom.Divider()}

            {/* call update to filter for selected date */}
            {console.log(events)}

            <FullCalendar 
                plugins={[resourceTimelinePlugin]}
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                timeZone='UTC'
                initialView='resourceTimelineDay'
                aspectRatio= {1.7}
                slotMinWidth= {25}
                scrollTime='8:00:00'
                headerToolbar= {{
                    left: 'prev,next',
                    center: 'title',
                    right: 'resourceTimelineDay'
                }}
                editable= {true}
                resourceAreaColumns={resourceAreaColumns}
                resourceOrder= 'tOrder'
                resources={Event.resources()}
                events={events}
            />
        </div>
    )
}
    
export default CalendarPane;