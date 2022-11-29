export class Review {
  constructor(
    public id?: number,
    public courseId?: number,
    public userId?: number,
    public datetimeCreated?: Date,
    public rating?: number,
    public feedback?: string
) { }
}
