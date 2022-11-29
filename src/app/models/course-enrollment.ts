export class CourseEnrollment {
    constructor(
        public id?: number,
        public courseId?: number,
        public userId?: number,
        public datetimeEnrolled?: Date
    ) { }
}