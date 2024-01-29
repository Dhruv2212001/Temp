export interface IAttendance {
    empname: string;
    attendanceId: number;
    id: string;
    attendanceDate: string;
    inTime: Date;
    outTime: Date;
    isFullDay: boolean;
    empcontact: number
}

export class attendance {
    attendanceId: number;
    id: number;
    attendanceDate?: Date;
    inTime?: Date;
    outTime?: Date;
    isFullDay: boolean;
    empcontact?: number
    constructor(){
        this.attendanceId = 0;
        this.id = 0;
        this.attendanceDate = undefined;
        this.inTime = undefined,
        this.outTime = undefined,
        this.isFullDay = false,
        this.empcontact = 0

    }
}
  