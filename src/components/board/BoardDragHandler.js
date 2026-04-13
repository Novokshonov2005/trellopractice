import {arrayMove} from "@dnd-kit/sortable"

export function reorderListsFromDrag(event, lists) {
  const { active, over } = event;
  if (!over) return null;

  const activeId = String(active.id);
  const overId = String(over.id);
  if (activeId === overId) return null;

  const listIds = lists.map((l) => l.id);
  const isList = (id) => listIds.includes(id);

  if (isList(activeId) && isList(overId)) {
    const oldIndex = lists.findIndex((l) => l.id === activeId);
    const newIndex = lists.findIndex((l) => l.id === overId);
    if (oldIndex === -1 || newIndex === -1) return null;
    return arrayMove(lists, oldIndex, newIndex);
  }

  if (isList(activeId) && !isList(overId)) {
    return null;
  }

  const findListWithCard = (cardId) =>
    lists.find((l) => l.cards.some((c) => c.id === cardId));

  const activeList = findListWithCard(activeId);
  if (!activeList) return null;

  let overList = findListWithCard(overId);
  if (!overList) {
    overList = lists.find((l) => l.id === overId);
  }
  if (!overList) return null;

  const activeCard = activeList.cards.find((c) => c.id === activeId);
  if (!activeCard) return null;

  if (activeList.id === overList.id) {
    const oldIndex = activeList.cards.findIndex((c) => c.id === activeId);
    const newIndex = activeList.cards.findIndex((c) => c.id === overId);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
      return null;
    }
    return lists.map((l) =>
      l.id === activeList.id
        ? { ...l, cards: arrayMove(l.cards, oldIndex, newIndex) }
        : l,
    );
  }

  const oldIndex = activeList.cards.findIndex((c) => c.id === activeId);
  let newIndex = overList.cards.findIndex((c) => c.id === overId);
  if (newIndex === -1) {
    newIndex = overList.cards.length;
  }

  return lists.map((l) => {
    if (l.id === activeList.id) {
      return { ...l, cards: l.cards.filter((c) => c.id !== activeId) };
    }
    if (l.id === overList.id) {
      const next = [...l.cards];
      next.splice(newIndex, 0, activeCard);
      return { ...l, cards: next };
    }
    return l;
  });
}