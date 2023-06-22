import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import Context from "../Context/Context";
import { deleteAd, getMyInfo, updateMyInfo } from "../http/Services";
import { GetAllAds } from "../http/Services";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function CreateAd() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  console.log(userData);
  const [ads, setAds] = useState([]);
  const [copy, setCopy] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await getMyInfo();
        const resp = await GetAllAds({ author: { $in: res.data._id } });
        // console.log(resp.data);
        // let { gender, activityDescription, address } = res.data;
        setUserData({ ...res.data });
        setAds(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const saveChanges = async () => {
    try {
      setEdit(false);
      let res = await updateMyInfo(userData);
      let { gender = "", activityDescription = "", address = "" } = res.data;
      setUserData({
        ...res.data,
        gender,
        activityDescription,
        address,
      });
    } catch (err) {
      setUserData(copy);
      console.log(err);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setCopy(userData);
  };

  const handleCancel = () => {
    setEdit(false);
    setUserData(copy);
  };
  //////////////////////////////////

  const handleDelete = async (id) => {
    try {
      let res = await deleteAd(id);
      console.log(res);
      let newAds = ads.filter((ad) => ad._id !== id);
      setAds(newAds);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen min-w-full  ">
      <Navbar />
      {/* form div in */}
      <div className="flex flex-col justify-center items-center ">
        <div className=" flex flex-row  min-h-screen  w-[80%]  bg-[#F4F8FF] border-2 border-[#9fb8e4] px-16 ">
          <div>
            <p className="text-heading font-Poppins font-bold text-[4.25rem] text-left pt-20">
              About me
            </p>
            <p className="text-subheading text-[18px] mt-5 ">
              My info caters all the information about the user. It includes all
              the following
            </p>
            <div className="flex flex-col  w-[40%]">
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.name}
                placeholder="First Name"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setUserData({ ...userData, name: event.target.value });
                }}
              />
              <TextField
                disabled={true}
                id="standard-basic"
                value={userData.email}
                placeholder="Email"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({ ...userData, email: event.target.value });
                }}
              />
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.phoneNo}
                placeholder="Phone No"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({ ...userData, phoneNo: event.target.value });
                }}
              />
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.mode}
                placeholder="Role"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({ ...userData, mode: event.target.value });
                }}
              />
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.address}
                placeholder="Address"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({ ...userData, address: event.target.value });
                }}
              />
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.gender}
                placeholder="Gender"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({ ...userData, gender: event.target.value });
                }}
              />
              <TextField
                disabled={!edit}
                id="standard-basic"
                value={userData.activityDescription}
                placeholder="Activity Description"
                variant="standard"
                style={{ width: "100%", marginTop: "1rem" }}
                onChange={(event) => {
                  setUserData({
                    ...userData,
                    activityDescription: event.target.value,
                  });
                }}
              />
            </div>
            <div className="flex">
              <button
                onClick={handleEdit}
                className="bg-[red] text-[#ffffff] font-Poppins font-bold text-[1.2rem] mr-5 rounded-[8px] px-4 py-2 mt-5"
              >
                Edit
              </button>
              <button
                onClick={saveChanges}
                className="bg-[green] text-[#ffffff] font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2 mt-5"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-[#e81818] text-white  font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2 mt-5 ml-5"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="ml-10">
            <div>
              <p className="text-heading font-Poppins font-bold text-[4.25rem] text-left pt-20">
                My Ads
              </p>
            </div>
            <div className="flex flex-col  w-[100%]  ">
              {ads.map((ad, index) => (
                <ul className=" list-outside  my-3  w-[100%] flex justify-between ">
                  <li className="list-item  font-medium text-lg ">
                    {index + 1}. {ad.title}
                  </li>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ padding: 0, marginLeft: "1rem" }}
                      onClick={() => navigate(`/ProductDetails/${ad._id}`)}
                    >
                      Link
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        padding: 0,
                        marginLeft: "1rem",
                        backgroundColor: "#e81818",
                      }}
                      onClick={() => handleDelete(ad._id)}
                    >
                      Delete Ad
                    </Button>
                  </div>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* form div out */}
    </div>
  );
}

export default CreateAd;
