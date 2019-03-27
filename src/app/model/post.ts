export class Post {
    public tieuDe: string;
    public noiDung: string;
    public tag: any;
    public trangThai: boolean;
    public chuyenMucId: number;
    public nguoiTaoId: number;

    constructor(title, content, tag, status, categoryID, creatorID) {
        this.tieuDe = title;
        this.noiDung = content;
        this.tag = tag;
        this.trangThai = status;
        this.chuyenMucId = categoryID;
        this.nguoiTaoId = creatorID;
    }
}
