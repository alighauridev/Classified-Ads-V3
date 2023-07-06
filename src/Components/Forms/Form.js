import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";

import { Box, Tab, InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import { getCategories, postAd, postImages } from "../../http/Services";
import Textarea from "@mui/joy/Textarea";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import "./Forms.scss";
import Footer from "../../Components/Footer/Footer";
import FormControl from "@mui/material/FormControl";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Select from "@mui/material/Select";
import TabPanel from "@mui/lab/TabPanel";
import Frame from "../../assets/Frame 33.png";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["nike", "addida", "Bata"];
const namestwo = ["Location 1", "Location 2", "Location 3"];
const namesthree = ["Used", "New"];
const namesfour = ["val 1", "val 2"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Form = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "eerer",
    type: "ererer",
    price: "",
    category: "",
    location: "",
    images: [],
    condition: "erer",
    warranty: "erer",
    name: "",
    telephone: "",
    vehicle: "",
    property: "",
    bulkPrice: 0,
    deliveryOptions: "",
  });
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/v1/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const theme = useTheme();
  const [value, setValue] = useState("1");

  const handleChangese = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      images: event.target.files,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formI = new FormData();
    let images = [];
    for (let i = 0; i < formData.images.length; i++) {
      formI.append("files", formData.images[i]);
    }
    // formData.append("files", Obj.images);
    let response = await postImages(formI);
    if (response) {
      images = response.map((item) => item.filename);
    }
    console.log(formData);
    try {
      const response = await axios.post("/ads/createAd", {
        ...formData,
        images: images,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  return (
    <div className="post-back">
      <div className="postad-paretntwo">
        <div>
          <div className="post-ad-back-sec">
            <div>
              <h3 style={{ textAlign: "start", color: "black" }}>Post</h3>
            </div>
            <div>
              <h3 style={{ textAlign: "end", color: "#FB5018" }}>Clear</h3>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <TabPanel value="1">
                  <div className="text-filed-back">
                    {/* ADDITION MATERIAL UI */}
                    <div className="field-first">
                      <div>
                        <FormControl
                          sx={{ m: 1, width: 300 }}
                          className="formcontrol"
                        >
                          <InputLabel
                            id="demo-multiple-name-label"
                            className="labelc"
                          >
                            Category
                          </InputLabel>
                          <Select
                            style={{ borderRadius: "20px" }}
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-namet"
                            value={formData.category}
                            name="category"
                            onChange={handleInputChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                          >
                            {categories?.map((cat) => (
                              <MenuItem key={cat.name} value={cat.name}>
                                {cat.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="field-first">
                      <div>
                        <FormControl
                          sx={{ m: 1, width: 300 }}
                          className="formcontrol"
                        >
                          <InputLabel
                            id="demo-multiple-name-label"
                            className="labelc"
                          >
                            Select Location
                          </InputLabel>
                          <Select
                            style={{ borderRadius: "20px" }}
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-namet"
                            value={formData.location}
                            name="location"
                            onChange={handleInputChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                          >
                            {namestwo.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="add-photo">
                      <h1>Add Photo</h1>
                      <p>
                        First picture - is the title picture. You can change the
                        order of photos: just grab your photos and drag
                      </p>
                      <label htmlFor="select">
                        <img src={Frame} alt="" />
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          setFormData({ ...formData, images: e.target.files })
                        }
                      />
                      <div>
                        <p>
                          Supported formats are .jpg, .gif and .png, 5MB max
                        </p>
                      </div>
                    </div>
                    <div className="social-media">
                      <button>link to youtube</button>
                      <button>link to tiktok</button>
                      <button>link to facebook</button>
                    </div>
                    <div className="next" onClick={(e) => setValue("2")}>
                      <button>Next</button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="post-back">
                      <div className="postad-paretn">
                        <div>
                          <div className="post-ad-back-sec">
                            <div>
                              <h3
                                style={{
                                  textAlign: "start",
                                  color: "#FB5018",
                                }}
                              >
                                Back
                              </h3>
                            </div>
                            <div>
                              <h3>Post Ad</h3>
                            </div>
                            <div>
                              <h3
                                style={{
                                  textAlign: "end",
                                  color: "#FB5018",
                                }}
                              >
                                Clear
                              </h3>
                            </div>
                          </div>
                          <div>
                            <div className="text-filed-back">
                              <input
                                type="text"
                                placeholder="Enter your title"
                                name="title"
                                required
                                id="standard-basic"
                                value={formData.title}
                                label="title"
                                variant="standard"
                                onChange={handleInputChange}
                                className="title"
                              />
                              <div className="field-first">
                                <div style={{ borderRadius: "20px" }}>
                                  <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    className="formcontrol"
                                  >
                                    <InputLabel
                                      id="demo-multiple-name-label"
                                      className="labelc"
                                    >
                                      Brands
                                    </InputLabel>
                                    <Select
                                      style={{ borderRadius: "20px" }}
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      value={formData.brand}
                                      name="brand"
                                      onChange={handleInputChange}
                                      input={<OutlinedInput label="Name" />}
                                      MenuProps={MenuProps}
                                    >
                                      {namesfour.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div>
                                  <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    className="formcontrol"
                                  >
                                    <InputLabel
                                      id="demo-multiple-name-label"
                                      className="labelc"
                                    >
                                      Type
                                    </InputLabel>
                                    <Select
                                      style={{ borderRadius: "20px" }}
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-namet"
                                      value={formData.type}
                                      name="type"
                                      onChange={handleInputChange}
                                      input={<OutlinedInput label="Name" />}
                                      MenuProps={MenuProps}
                                    >
                                      {namesfour.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                              <div className="field-first">
                                <div>
                                  <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    className="formcontrol"
                                  >
                                    <InputLabel
                                      id="demo-multiple-name-label"
                                      className="labelc"
                                    >
                                      Conditions
                                    </InputLabel>
                                    <Select
                                      style={{ borderRadius: "20px" }}
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      value={formData.condition}
                                      name="condition"
                                      onChange={handleInputChange}
                                      input={<OutlinedInput label="Name" />}
                                      MenuProps={MenuProps}
                                    >
                                      {namesfour.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div>
                                  <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    className="formcontrol"
                                  >
                                    <InputLabel
                                      id="demo-multiple-name-label"
                                      className="labelc"
                                    >
                                      Warranty
                                    </InputLabel>
                                    <Select
                                      style={{ borderRadius: "20px" }}
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-namet"
                                      value={formData.warranty}
                                      name="warranty"
                                      onChange={handleInputChange}
                                      input={<OutlinedInput label="Name" />}
                                      MenuProps={MenuProps}
                                    >
                                      {namesfour.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>

                              <div className="description">
                                <input
                                  type="textarea"
                                  style={{ borderRadius: "20px" }}
                                  placeholder="Description"
                                  id="standard-basic"
                                  defaultValue="Enter Description"
                                  minRows={2}
                                  required
                                  variant="standard"
                                  value={formData.description} // Update the value to formData.telephone
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      description: e.target.value,
                                    })
                                  }
                                  className="titletwo"
                                />
                              </div>

                              <div className="field-second">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="title"
                                    style={{ borderRadius: "20px" }}
                                    value={formData.name} // Update the value to formData.telephone
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    className="title"
                                    placeholder="Enter your telephone number"
                                    id="standard-basic"
                                    value={formData.telephone} // Update the value to formData.telephone
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        telephone: e.target.value,
                                      })
                                    }
                                    variant="standard"
                                    style={{ borderRadius: "20px" }}
                                  />
                                </div>
                              </div>
                              <div className="field-second">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Enter your Price"
                                    className="title"
                                    value={formData.price} // Update the value to formData.telephone
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Add Bulk Price"
                                    className="title"
                                    value={formData.bulkPrice} // Update the value to formData.telephone
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        bulkPrice: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  marginTop: "30px",
                                  marginLeft: "10px",
                                }}
                              ></div>
                            </div>
                            <div className="delivery-parent">
                              <div className="text">
                                <h1>delivery</h1>
                                <div>
                                  <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    className="formcontrol"
                                  >
                                    <InputLabel
                                      id="demo-multiple-name-label"
                                      className="labelc"
                                    >
                                      Add Delivery Options
                                    </InputLabel>
                                    <Select
                                      style={{ borderRadius: "20px" }}
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      value={formData.deliveryOptions}
                                      name="deliveryOptions"
                                      onChange={handleInputChange}
                                      input={<OutlinedInput label="Name" />}
                                      MenuProps={MenuProps}
                                    >
                                      {namesfour.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            <div className="delivery-parent">
                              <div className="text">
                                <h1>Promote your ad</h1>
                                <p>
                                  Please, choose one of the following options to
                                  post your ad
                                </p>
                                <div
                                  className="standard"
                                  style={{ borderRadius: "20px" }}
                                >
                                  <h1>Standard Ad</h1>
                                </div>
                              </div>
                              <div className="top">
                                <h1 className="top-text">Top</h1>
                                <div className="buttons">
                                  <div className="plan">
                                    <button className="buttf">7 Days</button>
                                    <button className="butts">30 Days</button>
                                  </div>
                                  <div className="price">
                                    <h1>₦ 2,899</h1>
                                  </div>
                                </div>
                              </div>
                              <div className="top">
                                <h1 className="top-text">Boost Premium</h1>
                                <div className="buttons">
                                  <div className="plan">
                                    <button className="buttf">1 Month</button>
                                  </div>
                                  <div className="price">
                                    <h1>₦ 20,999</h1>
                                  </div>
                                </div>
                              </div>
                              <div className="create">
                                <button type="submit">Next</button>
                              </div>
                              <div className="para">
                                <p>
                                  By clicking on Post Ad, you accept the Terms
                                  of Use, confirm that you will abide by the
                                  Safety Tips, and declare that this posting
                                  does not include any Prohibited Items.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
