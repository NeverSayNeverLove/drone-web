import { Injectable } from '@angular/core';
import { Config } from '../helper/config';
import { DataService } from '../helper/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { DronedaotaoService, DroneDaoTao } from '../training/dronedaotao.service';
import { DiadiembayService, DiaDiemBay } from '../training/diadiembay.service';
import { UserService, User } from '../auth/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
    // 'x-requested-with': 'XMLHttpRequest'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LichtapbayService {

  constructor(
    private http: HttpClient,
    private dataSrv: DataService,
    public datepipe: DatePipe,
    private droneSrv: DronedaotaoService,
    private placeSrv: DiadiembayService,
    private userSrv: UserService,
  ) { }
  
  //FETCH LỊCH TẬP BAY THEO ID
  async fetchFlyPlanById(id) {
    let flyPlanPromise: any;
    try {
      flyPlanPromise = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/${id}`, httpOptions)
          .subscribe(data => {
            console.log(data);
            resolve(data);
          });
      });
    } catch (error) {
      throw error;
    }
    return flyPlanPromise;
  }

  //FOMAT DATE
  fomatDate(date: Date) {
    let fomated_Date = "";
    // fomated_Date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    fomated_Date =this.datepipe.transform(date, 'dd-MM-yyyy');
    return fomated_Date;
  }

  // Fetch tat ca lich tap bay cua nha cung cap
  async fetchFlyPlanByNccId(nccID: number) {
    return this.fetchFlyPlanBy_NccId_StartEnd_UserId(nccID, "", "", "", "", "", "", "", "");
  }

  // Fetch tat ca lich tap bay cua nha cung cap startDate-endDate
  async fetchFlyPlanByNccIdFromTo(nccID: number, startTime: Date, endTime: Date) {
    return this.fetchFlyPlanBy_NccId_StartEnd_UserId(nccID, startTime.toISOString(), "", "", endTime.toISOString(), "", "", "", "");
  }

  //FETCH LIST LỊCH TẬP BAY => (NHÀ CUNG CẤP ID + Bắt đầu từ + Bắt đầu đến + NGƯỜI ĐĂNG KÍ ID)
  async fetchFlyPlanBy_NccId_StartEnd_UserId(
    nhacungcapId: number,
    batDauTu: string,
    batDauDen: string,
    ketThucSau: string,
    ketThucTruoc: string,
    nguoiDangKyId: string,
    droneId: string,
    diaDiemId: string,
    trangThai: string,
    ) {

    let listPromise: any;
    listPromise = [];
    try {
      let startBefore = "";
      let startAfter = "";
      let endAfter = "";
      let endBefore = "";

      if (batDauTu) {
        startAfter = this.fomatDate(new Date(batDauTu));
      }
      if (batDauDen) {
        startBefore = this.fomatDate(new Date(batDauDen));
      }
      if (ketThucSau) {
        endAfter = this.fomatDate(new Date(ketThucSau));
      }
      if (ketThucTruoc) {
        endBefore = this.fomatDate(new Date(ketThucTruoc));
      }


      let tmp;
      tmp = await new Promise((resolve, reject) => {
        this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?`+
          `page=1&limit=${Config.pageSizeMax}`+
          `&droneId=` + droneId+
          `&diaDiemId=` + diaDiemId+
          `&trangThai=` + trangThai+
          `&batDauTruoc=` + startBefore+
          `&batDauSau=` + startAfter+
          `&ketThucTruoc=` + endBefore+
          `&ketThucSau=` + endAfter+
          `&nguoiDangKyId=` + nguoiDangKyId, httpOptions)
          .subscribe(data => {
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];

      //Fetch từ trang thứ 2
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          this.http.get(`${Config.api_endpoint}lich-tap-bay/nha-cung-cap-id=${nhacungcapId}?`+
          `page=${page}&limit=${pageSize}`+
          `&droneId=` + droneId+
          `&diaDiemId=` + diaDiemId+
          `&trangThai=` + trangThai+
          `&batDauTruoc=` + startBefore+
          `&batDauSau=` + startAfter+
          `&ketThucTruoc=` + endBefore+
          `&ketThucSau=` + endAfter+
          `&nguoiDangKyId=` + nguoiDangKyId, httpOptions)
            .subscribe(data => {
              resolve(data);
            });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  // Fetch tat ca lich tap bay cua nguoi dung
  async fetchFlyPlanByUserID(userID: number) {
    return this.fetchFlyPlanByUserId_StartEnd_NccId(userID, "", "", "", "", "", "", "", "");
  }

  // Fetch tat ca lich tap bay cua nguoi dung startDate-endDate
  async fetchFlyPlanByUserIdFromTo(userID: number, startTime: Date, endTime: Date) {
    return this.fetchFlyPlanByUserId_StartEnd_NccId(userID, startTime.toISOString(), "", "", endTime.toISOString(), "", "", "", "");
  }

  //FETCH LIST LỊCH TẬP BAY => (NGƯỜI ĐĂNG KÍ ID + Bắt đầu từ + Bắt đầu đến)
  async fetchFlyPlanByUserId_StartEnd_NccId(
    nguoiDangKyId: number,
    batDauTu: string,
    batDauDen: string,
    ketThucSau: string,
    ketThucTruoc: string,
    nhacungcapId: string,
    droneId: string,
    diaDiemId: string,
    trangThai: string,) {

    let listPromise: any;
    listPromise = [];
    try {
      let startBefore = "";
      let startAfter = "";
      let endAfter = "";
      let endBefore = "";

      if (batDauTu) {
        startAfter = this.fomatDate(new Date(batDauTu));
      }
      if (batDauDen) {
        startBefore = this.fomatDate(new Date(batDauDen));
      }
      if (ketThucSau) {
        endAfter = this.fomatDate(new Date(ketThucSau));
      }
      if (ketThucTruoc) {
        endBefore = this.fomatDate(new Date(ketThucTruoc));
      }

      let tmp;
      tmp = await new Promise((resolve, reject) => {
        // this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nguoiDangKyId}?page=1&limit=${Config.pageSizeMax}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nhaCungCapId=${nhacungcapId}`, httpOptions)
        this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nguoiDangKyId}?`+
          `page=1&limit=${Config.pageSizeMax}`+
          `&droneId=` + droneId+
          `&diaDiemId=` + diaDiemId+
          `&trangThai=` + trangThai+
          `&batDauTruoc=` + startBefore+
          `&batDauSau=` + startAfter+
          `&ketThucTruoc=` + endBefore+
          `&ketThucSau=` + endAfter+
          `&nhaCungCapId=` + nhacungcapId, httpOptions)
          .subscribe(data => {
            resolve(data);
          });
      });
      listPromise.push(tmp);

      let pages = tmp['totalPages'];
      let pageSize = tmp['size'];

      //Fetch từ trang thứ 2
      for (let page = 2; page <= pages; page++) {
        tmp = await new Promise((resolve, reject) => {
          // this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nhacungcapId}?page=${page}&limit=${pageSize}&droneId=&diaDiemId=&trangThai=&batDauTruoc=${batDauDen}&batDauSau=${batDauTu}&ketThucTruoc=&ketThucSau=&nhaCungCapId=${nhacungcapId}`, httpOptions)
          this.http.get(`${Config.api_endpoint}lich-tap-bay/nguoi-dang-ky-id=${nguoiDangKyId}?`+
          `page=${page}&limit=${pageSize}`+
          `&droneId=` + droneId+
          `&diaDiemId=` + diaDiemId+
          `&trangThai=` + trangThai+
          `&batDauTruoc=` + startBefore+
          `&batDauSau=` + startAfter+
          `&ketThucTruoc=` + endBefore+
          `&ketThucSau=` + endAfter+
          `&nhaCungCapId=` + nhacungcapId, httpOptions)
          .subscribe(data => {
              resolve(data);
            });
        });
        listPromise.push(tmp);
      }
    } catch (error) {
      throw error;
    }
    return listPromise;
  }

  createLichTapBay(lichtapbay) {
    return this.http.post(`${Config.api_endpoint}lich-tap-bay/save`, lichtapbay, httpOptions);
  }

  updateLichTapBay(lichtapbay) {
    return this.http.post(`${Config.api_endpoint}lich-tap-bay/save`, lichtapbay, httpOptions);
  }

  public saveLichTapBayToLocal(e): LichTapBay {
      console.log('save e', e)
      let key = 'CurrentUser'
      let currentUser = this.userSrv.getCurrentUser(key);
      let lichTapBay = new LichTapBay(e.id, e.ghiChu,
                      new Date(e.thoiGianBatDau),
                      new Date(e.thoiGianKetThuc),
                      e.noiDung, e.trangThai,
                      currentUser,
                      this.userSrv.findNhaCungCap(e.nhaCungCapId),
                      this.placeSrv.findDiaDiemBay(e.diaDiemBayId),
                      this.droneSrv.findDrone(e.droneDaoTaoId))
      console.log('save local lich bay', lichTapBay);
      return lichTapBay;
  }


  public  saveLichTapBayToServer(e) {
    this.updateLichTapBay(e).subscribe(
        (lichtapbay) => {console.log('lich bay:', lichtapbay)},
        (error: any) => {console.log(error)}
    );
  }

  // check xem event co phai o trang thai Started hoac Cancelled
  public isStartedOrCancelledEvent(status): boolean {
      return status == this.dataSrv.statusList[2].name || status == this.dataSrv.statusList[3].name
  }

  public getLichBayStatusName(status): string {
      switch (status) {
          case this.dataSrv.statusList[0].name:
              return this.dataSrv.statusList[0].eName
          case this.dataSrv.statusList[1].name:
              return this.dataSrv.statusList[1].eName
          case this.dataSrv.statusList[2].name:
              return this.dataSrv.statusList[2].eName
          case this.dataSrv.statusList[3].name:
              return this.dataSrv.statusList[3].eName
          default:
              break;
      }
  }
}


export class LichTapBay {

  private _DroneName: string;
  public get DroneName(): string {
    return this._DroneName;
  }
  public set DroneName(value: string) {
    this._DroneName = value;
  }

  public get PlaceName(): string {
    return this.diaDiemBay.diaChi;
  }

  constructor(
    public Id: number = 0,
    public Subject: string = "",
    public StartTime: Date = new Date(),
    public EndTime: Date = new Date(),
    public description: string = "",
    public status: string = "1",
    public nguoiDangKy: User,
    public nhaCungCap: User,
    public diaDiemBay: DiaDiemBay,
    public droneDaoTao: any,
    public CategoryColor: string = "#f57f17",
    public IsReadonly: boolean = false,
    public IsAllDay: boolean = false,
    public typeOfEvent: string = "LichTapBay",
  ) {}
}