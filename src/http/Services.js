import axios from "./axiosSet";

export const Loginn = async (email, pass) => {
  try {
    const res = await axios.post("/auth/login", {
      email: email,
      password: pass,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const googleLogin = async () => {
  try {
    const res = await axios.get("/auth/google/done", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("its google", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

/////////////////////////////////////////////////////*////////////////////////////////////////////////////
export const Registerr = async (
  email,
  pass,
  name,
  phoneNo,
  preferrence,
  mode
) => {
  try {
    const res = await axios.post("/auth/signup", {
      name: name,
      email: email,
      password: pass,
      phoneNo: phoneNo,
      preferrence: [preferrence],
      mode: mode,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

/////////////////////////////////////////////////////*////////////////////////////////////////////////////
export const GetAllAds = async (filter, page, limit) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      "/ads/getall",
      {
        filter: filter ? filter : {},
        page: page ? page : 1,
        limit: limit ? limit : 10,
      },
      config
    );
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
export const GetAllAdsAdmin = async () => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      "/ads/getallAdmin",

      config
    );
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateAd = async (id, data) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.put("/ads/updateAd", { id: id, ...data }, config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
export const getAd = async (id) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.post("/ads/getAd", { id: id }, config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
///////////////////////////////////////////////////////////////////Post AD
export const postAd = async (data) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.post("/ads/createAd", data, config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
///////////////////////////////////////////////////////////////////Get Categories
export const getCategories = async () => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.post("/category/", config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
////////////////////////////////////////////UPDATE PAKAGE
export const getpakagetwo = async () => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.get("/plans", config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const pkgedit = async (id, body) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("in get all ads");

    const res = await axios.put("/plans/" + id, body);
    console.log('hello abdullah', body)
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

////////////////////////////////////////////postImage
export const postImages = async (data) => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    // console.log("in get all ads");

    const res = await axios.post("/upload/uploadFile", data, config);
    console.log("data" + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMyInfo = async () => {
  try {
    const token = localStorage.getItem("@accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("/info/getInfo", config);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const updateMyInfo = async (data) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@accessToken")}`,
      },
    };

    let res = await axios.put("/info/updateInfo", data, config);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
///////////////delete ad
export const deleteAd = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@accessToken")}`,
      },
      data: { id: id },
    };
    const resp = await axios.delete("/ads/deleteAd", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
