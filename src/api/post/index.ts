import { siteConfig } from '../../site.config'
const get = ({ page = 1, size = 20, keyword = '' } = {}) => {
    let url = siteConfig.blogApiUrl + `/article?current=${page}&pageSize=${size}&keyword=${keyword}`
    return fetch(url)
        .then(res => res.json())
}
const getCategory = () => {
    return fetch(siteConfig.blogApiUrl + '/category/get')
        .then(res => res.json())
}
const getById = (id:number) => {
    return fetch(siteConfig.blogApiUrl + '?id=' + id)
        .then(res => res.json())
}
export {
    getCategory,
    get,
    getById
}