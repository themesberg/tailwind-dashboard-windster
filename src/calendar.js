// Work in progress

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');
    const events = [
        {
            id: 1,
            title: 'Call with Jane',
            start: '2021-11-18',
            end: '2021-11-19',
            className: 'bg-red'
        },

        {
            id: 2,
            title: 'Dinner meeting',
            start: '2021-11-21',
            end: '2021-11-22',
            className: 'bg-orange'
        },

        {
            id: 3,
            title: 'HackTM conference',
            start: '2021-11-29',
            end: '2021-11-30',
            className: 'bg-green'
        },

        {
            id: 4,
            title: 'Meeting with John',
            start: '2021-12-01',
            end: '2021-12-02',
            className: 'bg-blue'
        },

        {
            id: 5,
            title: 'Summer Hackaton',
            start: '2021-12-03',
            end: '2021-12-04',
            className: 'bg-purple'
        },

        {
            id: 6,
            title: 'Digital event',
            start: '2021-12-07',
            end: '2021-12-09',
            className: 'bg-info'
        },

        {
            id: 7,
            title: 'Marketing event',
            start: '2021-12-10',
            end: '2021-12-11',
            className: 'bg-blue'
        },

        {
            id: 8,
            title: 'Dinner with Parents',
            start: '2021-12-19',
            end: '2021-12-20',
            className: 'bg-red'
        },

        {
            id: 9,
            title: 'Black Friday',
            start: '2021-12-23',
            end: '2021-12-24',
            className: 'bg-yellow'
        },

        {
            id: 10,
            title: 'Cyber Week',
            start: '2021-12-02',
            end: '2021-12-03',
            className: 'bg-red'
        }
    ];

    let calendar = new Calendar(calendarEl, {
        selectable: true,
        plugins: [dayGridPlugin, interactionPlugin],
        events: events,
        initialDate: '2021-12-01',
        editable: true,
        dateClick: (d) => {
            console.log('date click');
            // addNewEventModal.show();
            // newEventTitleInput.value = '';
            // newEventStartDatepicker.setDate(d.date);
            // newEventEndDatepicker.setDate(d.date.setDate(d.date.getDate() + 1));

            // addNewEventModalEl.addEventListener('shown.bs.modal', function () {
            //     newEventTitleInput.focus();
            // });
        },
        eventClick: (info, element) => {
            console.log('event click');
            // set current id
            // currentId = info.event.id;
            // editEventTitleInput.value = info.event.title;
            // editEventStartDatepicker.setDate(info.event.start);
            // editEventEndDatepicker.setDate(info.event.end ? info.event.end : info.event.start);

            // editEventModal.show();
            // editEventModalEl.addEventListener('shown.bs.modal', function () {
            //     editEventTitleInput.focus();
            // });
        }
    });

    calendar.render();

    // setup new event button
    // const newEventButtonEl = document.createElement('button');
    // newEventButtonEl.classList = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-auto';
    // newEventButtonEl.innerHTML = '<svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> New event';
    // newEventButtonEl.setAttribute('data-modal-toggle', 'new-event-modal');
    // document.querySelector('.fc-header-toolbar.fc-toolbar').prepend(newEventButtonEl);
    // newEventButtonEl.addEventListener('click', () => {

    // });

    // document.getElementById('addNewEventForm').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     calendar.addEvent({
    //         id: Math.random() * 10000, // this should be a unique id from your back-end or API
    //         title: newEventTitleInput.value,
    //         start: moment(newEventStartDatepicker.getDate()).format('YYYY-MM-DD'),
    //         end: moment(newEventEndDatepicker.getDate()).format('YYYY-MM-DD'),
    //         className: 'bg-secondary',
    //         dragabble: true
    //     });
    //     addNewEventModal.hide();
    // });

    // document.getElementById('editEventForm').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     var editEvent = calendar.getEventById(currentId);
    //     var startDate = moment(editEventStartDatepicker.getDate()).format('YYYY-MM-DD');
    //     var endDate = moment(editEventEndDatepicker.getDate()).format('YYYY-MM-DD')

    //     editEvent.setProp('title', editEventTitleInput.value);
    //     editEvent.setStart(startDate);
    //     editEvent.setEnd(endDate);
    //     editEventModal.hide();
    // });

});