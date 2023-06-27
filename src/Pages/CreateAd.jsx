import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import Context from "../Context/Context";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getCategories, postAd, postImages } from "../http/Services";
import Textarea from "@mui/joy/Textarea";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";

import { toast } from "react-toastify";

function MyAccount() {
  const [Category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [league, setLeague] = useState(null);
  const [Obj, setObj] = React.useState({
    title: "",
    description: "",
    price: "",
    category: [],
    subCategory: "",
    images: [
      "https://tropicalspa.pk/wp-content/uploads/2023/01/Massage-Services-1536x1152.jpg",
    ],
    worker: { name: "", age: "", gender: "" },
    transaction: "sell",
    telephone: [],
    status: "accepted",
    Location: "",
    League: "",
  });
  console.log("Object", Obj);
  ///////////////////////////////////////   dropdown   ///////////////////////////////////////////////
  // const [Category, setCategory] = React.useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);

    setObj({ ...Obj, category: [event.target.value] });
  };
  //////////////////////////////////
  const adPost = async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();

      let images = [];
      for (let i = 0; i < Obj.images.length; i++) {
        formData.append("files", Obj.images[i]);
      }
      // formData.append("files", Obj.images);
      let response = await postImages(formData);
      if (response) {
        images = response.map((item) => item.filename);
      }
      setObj({ ...Obj, images: images });
      let arbitrator = {
        ...Obj,

        telephone: [tel1, tel2, tel3],
      };
      let send = { ...arbitrator, images: images };
      let res = await postAd(send);
      console.log(res);
      toast.success("Great!! Ad Posted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error!! Ad Not Posted");
    }
  };
  //////////////////////////////////

  useEffect(() => {
    //fetch categories
    const fetchCategories = async () => {
      try {
        const resp = await getCategories();
        if (resp.status === "OK") setCategories(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const Leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  return (
    <div className="min-h-screen min-w-full  ">
      <Navbar />
      {/* form div in */}
      <form onSubmit={adPost} encType="multipart/form-data">
        <div className="flex flex-col justify-center items-center ">
          <div className="w-[80%] h-screen bg-[#F4F8FF] border-2 border-[#9fb8e4] px-16 ">
            <p className="text-heading font-Poppins font-bold text-[4.25rem] text-left pt-20">
              Create Ad
            </p>
            <div className="flex  justify-around ">
              <div className="flex flex-col  w-[60%] ">
                <p className="text-subheading text-[18px] mt-5 ">
                  Enter following details to create an ad
                </p>
                <TextField
                  id="standard-basic"
                  value={Obj.title}
                  label="
                  title"
                  variant="standard"
                  style={{ width: "100%" }}
                  onChange={(event) => {
                    setObj({ ...Obj, title: event.target.value });
                  }}
                />
                <Textarea
                  placeholder="Description"
                  id="standard-basic"
                  defaultValue="
                  Enter Description"
                  minRows={2}
                  sx={{
                    backgroundColor: "#F4F8FF",
                    borderWidth: "1px",
                    borderColor: "#9fb8e4",
                    borderRadius: "5px",
                  }}
                  required
                  value={Obj.description}
                  label={Obj.description == "" ? "description" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setObj({ ...Obj, description: event.target.value });
                  }}
                />
                <TextField
                  id="standard-basic"
                  value={Obj.price}
                  label={Obj.price == "" ? "price" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setObj({ ...Obj, price: parseInt(event.target.value) });
                  }}
                />
                <TextField
                  id="standard-basic"
                  value={Obj.Location}
                  label={Obj.Location == "" ? "Location" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setObj({ ...Obj, Location: event.target.value });
                  }}
                />
                <TextField
                  id="standard-basic"
                  value={tel1}
                  label={Obj.telephone == "" ? "Tel1" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setTel1(event.target.value);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label={Obj.telephone == "" ? "Tel2" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setTel2(event.target.value);
                  }}
                />
                <TextField
                  id="standard-basic"
                  // value={Obj.telephone[2]}
                  label={Obj.telephone == "" ? "Tel3" : null}
                  variant="standard"
                  style={{ width: "100%", marginTop: "1rem" }}
                  onChange={(event) => {
                    setTel3(event.target.value);
                  }}
                />
                {/* add input for file type */}

                <div className="flex ">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={Category}
                      onChange={handleChange}
                      label="catégorie"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories.map((item) => {
                        return (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      subCategory
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={subCategory}
                      onChange={(e) => {
                        setObj({ ...Obj, subCategory: e.target.value });
                        setSubCategory(e.target.value);
                      }}
                      label="category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories
                        .filter((item) => item.name === Category)
                        .map((item) => {
                          return item.subCategories.map((item) => {
                            return <MenuItem value={item}>{item}</MenuItem>;
                          });
                        })}
                    </Select>
                  </FormControl>

                  <div className="bg-[#d3cfcf] text-[#2f2f2f]  font-Poppins font-bold text-[1.2rem] ml-5 mobile:hidden">
                    Note: You can select multiple categories by clicking on it.
                    You can also deselect them by clicking again above
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setObj({ ...Obj, images: e.target.files })}
                />
                {/* <div className="flex flex-row">
                  {Obj.category.map((item) => {
                    return (
                      <div
                        className="bg-[#d3cfcf] text-[#2f2f2f]  font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2 mt-5 ml-5"
                        onClick={() => {
                          setObj({
                            ...Obj,
                            category: Obj.category.filter((item2) => {
                              return item2 != item;
                            }),
                          });
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div> */}
              </div>
            </div>
            <div className="flex  justify-center">
              <button
                type="submit"
                className="bg-[#70cd59] text-[#ffffff] font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2 mt-5"
              >
                Create Ad +
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* form div out */}
    </div>
  );
}

export default MyAccount;
