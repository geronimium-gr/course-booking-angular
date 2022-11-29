export class Course {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: string,
        public isActive?: boolean,
        public datetimeCreated?: Date
    ) { }
}