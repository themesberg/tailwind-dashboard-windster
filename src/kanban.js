
import Sortable from 'sortablejs';
import kanbanLists from '../data/kanban.json';

Object.keys(kanbanLists).forEach(key => {
    const { id: listId } = kanbanLists[key];
    const kanbanColumn = document.getElementById(`kanban-list-${listId}`);

    if (kanbanColumn) {
        Sortable.create(kanbanColumn, {
            group: 'kanban',
            animation: 100,
            forceFallback: true,
            dragClass: 'drag-card',
            ghostClass: 'ghost-card',
            easing: 'cubic-bezier(0, 0.55, 0.45, 1)'
        });
    }
})