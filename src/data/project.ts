// projects
let template:any = [{
    name: 'music_mobile',
    description: '基于react开发的网易云web移动端',
    stargazers_count: 1,
    url: 'https://github.com/boycot2015/music_mobile'
},{
    url: 'https://github.com/boycot2015/nest_blog',
    name: 'nest_blog',
    stargazers_count: 6,
    description: '基于nodejs + nextjs + nestjs + typeorm + minio (文件存储) 个人博客全栈项目',
},{
    url: 'https://github.com/boycot2015/web-os',
    name: 'web-os',
    stargazers_count: 1,
    description: '基于Svelte 开发的web桌面，支持添加自定义应用，动态设置壁纸',
},{
    url: 'https://github.com/boycot2015/blog-admin',
    name: 'blog-admin',
    stargazers_count: 1,
    description: '基于Vue3+acro.design 开发的博客后台管理系统，后端服务采用nestjs,Resultful风格',
}]
export async function getAllProjects() {
    const auth = {
        client_id: 'Iv23li4DkMumgXoBzCQG',
        client_secret: 'eeacf8f39e329723d2e97c1edaa9214d0db8e5c1',
    }
    const projectsRes = await fetch(`https://api.github.com/users/boycot2015/repos?client_id=${auth.client_id}&client_secret=${auth.client_secret}`);
    let projects = await projectsRes.json();
    projects = projects.length ? projects : template;
    console.log(projects, 'projects');
    
    return projects?.filter((el:any) => !el.private && el.description && !el.fork && el.stargazers_count).map((el:any) => {
        let star = el.stargazers_count;
        el.star = star;
        if (star > 1000) el.star = Math.floor(star / 1000) + '.' + (star + '').substring(3, 4) + 'k';
        return el;
    }).sort((a:any, b:any) => b.star - a.star);
}