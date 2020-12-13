import mongoose from 'mongoose';
import Summery from '../models/Summery.js'

export const homeController = async (req, res) => { 
    const perPage = 10;
    let page = parseInt(req.query.page) || 1;
    try {
        const summery = await Summery.find({})
        .sort("-score")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .populate("_id");

        const count = await Summery.count();
        const selectbox = await Summery.find()
        res.render("index", {
        pageName: "Team Score",
        summery,
        selectbox,
        current: page,
        breadcrumbs: null,
        home: "/data/?",
        pages: Math.ceil(count / perPage),
        });
        // return res.render("index",{ summery : summery, selectbox: selectbox })

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const searchData = async (req , res)=>{
    // const perPage = 8;
    // let page = parseInt(req.query.page) || 1;
    // try {
    //     const summery = await Summery.find({title: { $regex: req.query.search, $options: "i" },})
    //     .sort("-score")
    //     .skip(perPage * page - perPage)
    //     .limit(perPage)
    //     .populate("_id")
    //     .exec();

    //     const count = await Summery.count({title: { $regex: req.query.search, $options: "i" },});
    //     res.render("index", {
    //     pageName: "Search Results",
    //     summery,
    //     current: page,
    //     breadcrumbs: null,
    //     home: "/products/search?search=" + req.query.search + "&",
    //     pages: Math.ceil(count / perPage),
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.redirect("/");
    // }
}
export const postController=async (req,res)=>{
    try {
        const {team_name1,team_name2, win_type1,win_type2} = req.body
        
        if(!team_name1 || !team_name2  || !win_type1 || !win_type2 ){
            req.flash('error','All fields is required.!')
            res.redirect('/')
        }
        console.log(team_name1)
        const CountScore = await Summery.exists({team_name:team_name1})
        console.log("CS="+CountScore)
        // if(team_name1 && win_type1=='wins'){

        // }
        // const matchData=new Summery({
        //     team_name,
        //     wins,
        //     losses,
        //     ties,
        //     score
        // })
        // matchData.save()
    } catch (error) {
        res.status(500)
        .json(error)
    }
}