import React, { useEffect, useState } from 'react';
import qds_Custom, { Definitions } from '../../resources/qds_Library/qds_custom.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceAreaColumns from './resources/resourceAreaColumns.js';
import './CalendarPane.css';

const CalendarPane = (props) => {
    const [calendar, setCalendar] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [scrollToTime, setScrollToTime] = useState(null);
    const [calendarRef, ] = useState(React.createRef());
    const [timelineRef, ] = useState(React.createRef());


    useEffect(() => {
        const handleDateSelect = (selectInfo) => {
            console.log(selectInfo);
            
            timelineRef.current._calendarApi.gotoDate(selectInfo.startStr)
            //calendar.props.children.setScrollToTime(dateObj)
    
            //prompt(selectInfo.startStr)
            let calendarApi = selectInfo.view.calendar
    
            calendarApi.unselect() // clear date selection
        }
        const handleEventChange = (apiResponse) => {
            if(apiResponse.oldEvent && apiResponse.event){
                const eventDbId = apiResponse.event.id;
    
                const oldEvent = apiResponse.oldEvent;
                const newEvent = apiResponse.event;
                
                const oldStartDate = oldEvent.startStr.split('T');
                const newStartDate = newEvent.startStr.split('T');
    
                const oldEndDate = oldEvent.endStr.split('T');
                const newEndDate = newEvent.endStr.split('T');
    
                //compare dates [0]
                if(newStartDate[0] !== oldStartDate[0]){
                    qds_Custom.dbSetValue('inquiries', eventDbId, 'eventDate', newStartDate[0]);
                }
    
                //compare times [1]
                if(newStartDate[1] !== oldStartDate[1]){
                    qds_Custom.dbSetValue('inquiries', eventDbId, 'startTime', newStartDate[0]);
                }
                if(newEndDate[1] !== oldEndDate[1]){
                    qds_Custom.dbSetValue('inquiries', eventDbId, 'stopTime', newStartDate[0]);
                }
            }
        }
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
        const selectEvent = (eventInfo) => {
            const calendarApi = timelineRef.current._calendarApi
            console.log(calendarApi)
            calendarApi.gotoDate(eventInfo.event.startStr);
            calendarApi.scrollToTime(eventInfo.event.startStr.split('T')[1])

            props.setSelectedInquiry(eventInfo.event.id);
            
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
                    {/* <b className="cal-popup-disp-time">{sString +  eString}</b> */}
                    <i className="cal-popup-disp-item">{eventInfo.event.title}</i>
                </>
            )
        }

        const events = generateCalendarEvents(props.inquiries);
        const getCalendar = () => {
            return (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'today prev next'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={events} // alternatively, use the `events` setting to fetch from a feed
                    eventDisplay='list'
                    select={handleDateSelect}
                    eventClick={selectEvent}
                    eventChange={handleEventChange}
                    eventContent={renderEventContent} // custom render function
                    eventLimit='3'
                    ref={calendarRef}
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                />
            )
        }
        const getTimeline = () =>{ 
            return (
                    <FullCalendar 
                        plugins={[resourceTimelinePlugin]}
                        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                        timeZone='UTC'
                        initialView='resourceTimelineDay'
                        aspectRatio= {1.7}
                        slotMinWidth= {25}
                        scrollTime='9:00:00'
                        headerToolbar= {{
                            left: 'title',
                            center: '',
                            right: 'prev next'
                        }}
                        editable={true}
                        eventStartEditable={true}
                        selectable= {true}
                        resourceAreaColumns={resourceAreaColumns}
                        resourceOrder= 'tOrder'
                        resources={Definitions.Event.resources()}
                        events={events}
                        eventClick={selectEvent}
                        ref={timelineRef}
                    />
            )
        }
        
        setCalendar(getCalendar())
        setTimeline(getTimeline())

    }, [props, scrollToTime])


    //#endregion


    return (
        <>
            {qds_Custom.Divider()}

            <div className='CalendarPane-basicCalendar-container'>
                <div className="-AppContentFull">
                    {calendar}
                </div>
            </div>

            {qds_Custom.Divider()}

            <div className='CalendarPane-basicCalendar-container'>
                <div className="-AppContentFull">
                    {timeline}
                </div>
            </div>
        </>
    )
}
    
export default CalendarPane;