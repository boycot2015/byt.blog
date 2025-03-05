import AV  from 'leancloud-storage';
AV.init({
    appId: "UFDAemKla2uvRCDNCBEGsVnA-gzGzoHsz",
    appKey: "mbNoKxkqSI3raGFUKAR1acV6",
    serverURL: "https://ufdaemkl.lc-cn-n1-shared.com",
});
const { Query, File } = AV;
const Book = AV.Object.extend("Book");
const get = () => {
    const query = new Query("Book");
    query.descending("createdAt");
    return query.find().then(function (data) {
        console.log("操作成功", data);
        return data
    }, function (err) {
        console.error("操作失败", err);
    });
};
const upload = async (filename:string, data:string|Blob|Buffer, cover?:any) => {
    const file = new File(filename, data);
    const book = new Book();
    book.set("title", filename.split('_')[0]);
    book.set("author", filename.split('_')[1] || '');
    book.set("marks", []);
    if (cover) {
        const coverFile = new File(filename.split('.')[0] + '_cover.png', cover);
        let coverUrl = await coverFile.save({ keepFileName: true }).then((file) => file)
        coverUrl && book.set("img", coverUrl.url());
        console.log(coverUrl.id, 'coverUrl');
        
        coverUrl && book.set("imgId", coverUrl.id || '');
    }
    return file.save({ keepFileName: true }).then((file) => {
        book.set("url", file.url() || '');
        book.save().then((res) => {
            console.log("上传成功", file.url(), res);
        })
        return file
    }, function (err) {
        console.error("上传失败", err);
    });
};
const handleDelete = (id: string) => {
    const book = AV.Object.createWithoutData('Book', id);
    const file = AV.File.createWithoutData(book.attributes?.imgId);
    book.attributes?.imgId && file.destroy();
    return book.destroy();
};
const saveMark = (id:string, data:any) => {
    const book = AV.Object.createWithoutData('Book', id);
    book.set("marks", data);
    return book.save().then(function (res) {
        console.log("保存成功", res);
        return res
    }, function (err) {
        console.error("保存失败", err);
    });
};
const updateMark = (id:string, data:any) => {
    const book = AV.Object.createWithoutData('Book', id);
    book.set("marks", data);
    return book.save().then(function (res) {
        console.log("保存成功", res);
        return res
    }, function (err) {
        console.error("保存失败", err);
    });
};
const getById = (id:string) => {
    const query = new Query("Book");
    return query.equalTo('objectId', id).first().then(function (data) {
        console.log("操作成功", data);
        return data
    }, function (err) {
        console.error("操作失败", err);
    });
};
export {
    get,
    upload,
    handleDelete,
    saveMark,
    updateMark,
    getById
}