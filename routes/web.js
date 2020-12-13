import { homeController } from '../app/controller/homeController.js'
import { postController } from '../app/controller/homeController.js'
import { searchData } from '../app/controller/homeController.js'
const InitRoute=(app)=>{
    app.get("/", homeController)
    app.get('/search',searchData)
    app.post("/post", postController)
}

export default InitRoute