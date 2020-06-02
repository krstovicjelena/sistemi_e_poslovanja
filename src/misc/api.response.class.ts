export class ApiResponse{
    status: string;
    statusCode: number;
    message: string | null;

    constructor(status:string,statusCode:number,message:string|null=null){
        this.status=status;
        this.statusCode=statusCode;
        this.message=message;
    }

}

// ovu klasu smo kreirali kako ne bismo imali greske vec ih na neki nacin hvatamo
//negativne vrednosti status koda su errori pozitivni su warning, a nula da nema greske