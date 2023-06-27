import http from "../http-common";

class FloodFillsDataService {
  getAll(userid) {

    const config = {
      headers:{
        userid: userid
      }
    };

    return http.get("/floodfills", config);
  }

  get(userid, id) {
    const config = {
      headers:{
        userid: userid
      }
    };

    return http.get("/floodfills/" + id, config);
  }   

  Add(userid, name, sizeX, sizeY, colors) {
    const config = {
      headers:{
        userid: userid
      }
    };

    var data = {
      name: name,
      sizeX: parseInt(sizeX),
      sizeY: parseInt(sizeY),
      colors: colors
    }

    return http.post("/floodfills", data, config);
  }  

  update(userid, id, x, y, color) {
    const config = {
      headers:{
        userid: userid
      }
    };

    var data = {
      x: parseInt(x),
      y: parseInt(y),
      color: color
    }

    return http.put("/floodfills/" + id, data, config);
  }

  delete(userid, id) {
    const config = {
      headers:{
        userid: userid
      }
    };

    return http.delete("/floodfills/" + id, config);
  }   
}

export default new FloodFillsDataService();