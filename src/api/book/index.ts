import AV from 'leancloud-storage';
AV.init({
    appId: "UFDAemKla2uvRCDNCBEGsVnA-gzGzoHsz",
    appKey: "mbNoKxkqSI3raGFUKAR1acV6",
    serverURL: "cloud.boycot.top",
});
type Book = {
    title: string;
    author: string;
    order: number;
    marks: any[];
    url?:string;
    fileId?:string;
    img?:string;
    imgId?:string;
}
const { Query, File } = AV;
const Book = AV.Object.extend("Book");
const get = () => {
    const query = new Query("Book");
    query.select(["title", "author", "order", "marks", "url", "fileId", "img", "imgId", "createdAt"]);
    query.descending("createdAt");
    return query.find().then(function (data) {
        // console.log("操作成功", data);
        return data.sort((a:any, b:any) => a.attributes.order - b.attributes.order);
    }, function (err) {
        console.error("操作失败", err);
    });
};
const update = (id:string, data: any) => {
    const book = AV.Object.createWithoutData('Book', id);
    for (const key in data) {
        if (data[key]) {
            book.set(key, data[key]);
        }
    }
    return book.save().then(function (res) {
        // console.log("保存成功", res);
        return res
    }, function (err) {
        console.error("保存失败", err);
    });
};
const upload = async (filename:string, data:string|Blob|Buffer, options: { cover?:any, onprogress?:any }) => {
    const file = new File(filename, data);
    const book = new Book();
    const { cover, onprogress } = options;
    book.set("title", filename.split('_')[0]);
    book.set("author", filename.split('_')[1] || '');
    book.set("order", 0);
    book.set("marks", []);
    if (cover) {
        const coverFile = new File(filename.split('.')[0] + '_cover.png', cover);
        let coverUrl = await coverFile.save({ keepFileName: true }).then((file) => file)
        coverUrl && book.set("img", coverUrl.url());
        console.log(coverUrl.id, 'coverUrl');
        
        coverUrl && book.set("imgId", coverUrl.id || '');
    }
    return file.save({ keepFileName: true, onprogress: (progress) => {
        console.log('上传进度', progress);
        onprogress && onprogress(progress)
    } }).then((file) => {
        book.set("url", file.url() || '');
        book.set("fileId", file.id || '');
        return book.save().then((res) => {
            // console.log("上传成功", file.url(), res);
            return res
        })
    }, function (err) {
        console.error("上传失败", err);
    });
};
const  handleDelete = async (id: string) => {
    const query:any = new Query("Book");
    let object = await query.equalTo('objectId', id).first();
    // console.log(object.attributes, 'book');
    const data = AV.Object.createWithoutData('Book', id);
    const file = AV.File.createWithoutData(object?.attributes?.fileId);
    const coverFile = AV.File.createWithoutData(object?.attributes?.imgId);
    object?.attributes?.imgId && coverFile.destroy();
    object?.attributes?.fileId && file.destroy();
    return data.destroy();
};
const saveMark = (id:string, data:any) => {
    const book = AV.Object.createWithoutData('Book', id);
    book.set("marks", data);
    return book.save().then(function (res) {
        // console.log("保存成功", res);
        return res
    }, function (err) {
        console.error("保存失败", err);
    });
};
const updateMark = (id:string, data:any) => {
    const book = AV.Object.createWithoutData('Book', id);
    book.set("marks", data);
    return book.save().then(function (res) {
        // console.log("保存成功", res);
        return res
    }, function (err) {
        console.error("保存失败", err);
    });
};
const getById = (id:string) => {
    const query = new Query("Book");
    return query.equalTo('objectId', id).first().then(function (data) {
        // console.log("操作成功", data);
        return data
    }, function (err) {
        console.error("操作失败", err);
    });
};
export {
    get,
    update,
    upload,
    handleDelete,
    saveMark,
    updateMark,
    getById
}