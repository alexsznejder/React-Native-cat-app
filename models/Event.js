class Event {
  constructor(id, catId, date, title, allDay, time, localization, description) {
    (this.id = id),
      (this.catId = catId),
      (this.date = date),
      (this.title = title),
      (this.allDay = allDay),
      (this.time = time),
      (this.localization = localization),
      (this.description = description);
  }
}

export default Event;
