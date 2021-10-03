const createError = require('http-errors');
const axios = require('axios');

// Global vars
let nav = [];
let children = [];
const baseURL = process.env.API_OPENLIBRA;

exports.masterFunction = async(method, value) => {
    try {
        const response = await axios.get(`${baseURL}${method}"${value}"`);
        console.log("RESPONSE: ", response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

exports.constructor = async() => {
    let catData = await axios.get(`${baseURL}get_categories=all`);
    let categories = catData.data;
    try {
        for(var i = 0; i < categories.length; i++){
            var count = 0;
            console.log("ITERACION::: ", count+1)
            let item = await axios.get(`${baseURL}get_subcategories_by_category_ID=${categories[i].category_id}`);
            if(item.data === [] || item.data.length === 0){
                nav.push({
                    _tag: 'CSidebarNavItem',
                    name: `${categories[i].name}`,
                    route: `/${categories[i].nicename}`,
                    to: `/base/${categories[i].nicename}`,
                    icon: 'cil-book',
                })
            }else{
                item.data?.map((element) => {
                    children.push({
                        _tag: 'CSidebarNavItem',
                        name: `${element.name}`,
                        to: `/base/${element.nicename}`,
                    })
                })
                var obj = {
                    _tag: 'CSidebarNavItem',
                    name: "Ver todo",
                    to: `/base/${categories[i].nicename}`,
                }
                children.push(obj);
                nav.push({
                    _tag: 'CSidebarNavDropdown',
                    name: `${categories[i].name}`,
                    route: '/base',
                    icon: 'cil-book',
                    _children: children
                })
            children = [];
            }
        }
    return nav;
    } catch (error) {
        console.log(error);
    }
}
