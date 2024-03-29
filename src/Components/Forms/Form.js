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
const namestwo = ["Abuja (Fct)", "Lagos State", "Ogun State", 'Oyo State', 'Rivers State', 'Abia State', 'Adamawa State', 'Akwa Ibom State', 'Anambra State', 'Bauchi State', 'Bayelsa State', 'Benue State'];
const namesthree = ["Used", "New"];
const namesfour = ["Toyota", "Ford", "Honda", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Nissan", "Hyundai", "Kia", "Subaru", "Tesla"];
const namefive = ["Mainstream Brands", "Luxury Brands", "Sports Car Brands", "Electric Vehicle (EV) Brands"]
const namesix = ["Used", "New"]
const nameseven = ["One Year", "Two year", "Three Year", "Four Year", "Five Year", "Six Year"]
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
    brand: "",
    type: "",
    price: "",
    category: "",
    location: "",
    address: "",
    images: [],
    condition: "",
    warranty: "",
    name: "",
    telephone: "",
    vehicle: "",
    property: "",
    bulkPrice: 0,
    deliveryOptions: "",
    propertyType: "",      // Added field
    parkingSpace: "", // Initialize as an empty array
    furnishing: "",
    squareMeter: 0,            // Added field
    secureParking: false,      // Added field
    serviceCharge: false,      // Added field
    minimumRentTime: "",       // Added field
    agencyFee: "",             // Added field
    legalAndAgreement: "",     // Added field
    cautionFee: "",            // Added field
  });
  const [cat, setCat] = useState("")
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

  const handleInputChangese = (event, newValue) => {
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
      // navigate("/");
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
                              <MenuItem onClick={() => setCat(cat.name)} key={cat.name} value={cat._id}>
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
                      <input id="select" style={{ display: 'none' }}
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

                  {
                    cat === "Vehicle" && <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="post-back">
                        <div className="postad-paretn">
                          <div>

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
                                        {namefive.map((cat) => (
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
                                        <pre>
                                          Conditions
                                        </pre>
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
                                        {namesix.map((cat) => (
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
                                        {nameseven.map((cat) => (
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
                  }
                  {
                    cat === "Property" && <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="post-back">
                        <div className="postad-paretnse">
                          <div>

                            <div>
                              {/* REQUIRMENT FIELDS SECTION START HERE */}
                              <div className="text-filed-back">
                                <input
                                  type="text"
                                  placeholder="Enter your title"
                                  name="title"
                                  required
                                  id="standard-basic"
                                  value={formData.title}
                                  onChange={handleInputChange}
                                  className="title"
                                />

                                <input
                                  type="text"
                                  placeholder="Address"
                                  name="address"
                                  required
                                  id="standard-basic"
                                  value={formData.address}
                                  onChange={handleInputChange}
                                  className="title"
                                />

                                {/* ADDITION MATERIAL UI */}

                                {/* ================================ */}

                                <div className="field-second">
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Property Type
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.propertyType}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="propertyType"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}

                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>

                                    </FormControl>
                                  </div>
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Condition
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="condition"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, formData.condition, theme)}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="field-second">
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Furnishing
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.furnishing}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="furnishing"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, formData.furnishing, theme)}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Parking Space
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.parkingSpace}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="parkingSpace"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, formData.parkingSpace, theme)}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="field-second">
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Furnishing
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.furnishing}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="furnishing"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, formData.furnishing, theme)}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div style={{ marginTop: "23px" }}>
                                    <FormControl
                                      sx={{ m: 1, width: 300 }}
                                      className="formcontrol"
                                    >
                                      <InputLabel
                                        id="demo-multiple-name-label"
                                        className="labelc"
                                      >
                                        Parking Space
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={formData.parkingSpace}
                                        onChange={handleInputChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        name="parkingSpace"
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, formData.parkingSpace, theme)}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="field-first">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Square Meters (Sqm)"
                                      name="squareMeter"
                                      required
                                      id="standard-basic"
                                      value={formData.squareMeter}
                                      onChange={handleInputChange}
                                      className="title"
                                    />
                                  </div>
                                </div>
                                <div className="secure">
                                  <div>
                                    <h1>Secure Parking</h1>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        className="larger"
                                        name="secureParking"
                                        checked={formData.secureParking}
                                        onChange={handleInputChange} // Add onChange handler
                                      />
                                      <h1>Yes</h1>
                                    </div>
                                  </div>
                                  <div>
                                    <h1>Service Charge</h1>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        className="larger"
                                        name="serviceCharge"
                                        checked={formData.serviceCharge}
                                        onChange={handleInputChange} // Add onChange handler
                                      />
                                      <h1>Yes</h1>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "20px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Minimum Rent Time"
                                    name="minimumRentTime"
                                    required
                                    id="standard-basic"
                                    value={formData.minimumRentTime}
                                    onChange={handleInputChange}
                                    className="title"
                                  />

                                  <input
                                    type="text"
                                    placeholder="Agency Fee"
                                    name="agencyFee"
                                    required
                                    id="standard-basic"
                                    value={formData.agencyFee}
                                    onChange={handleInputChange}
                                    className="title"
                                  />
                                </div>

                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "20px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Legal And Agreement"
                                    name="legalAndAgreement"
                                    required
                                    id="standard-basic"
                                    value={formData.legalAndAgreement}
                                    onChange={handleInputChange}
                                    className="title"
                                  />

                                  <input
                                    type="text"
                                    placeholder="Caution Fee"
                                    name="cautionFee"
                                    required
                                    id="standard-basic"
                                    value={formData.cautionFee}
                                    onChange={handleInputChange}
                                    className="title"
                                  />
                                </div>

                                <div className="description">
                                  <input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    id="standard-basic"
                                    defaultValue="Enter Description"
                                    minrows={2} // Change minRows to minrows
                                    required
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="titletwo"
                                  />

                                </div>

                                <div>
                                  <input
                                    type="text"
                                    placeholder="Enter price"
                                    name="price"
                                    required
                                    id="standard-basic"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="title"
                                  />
                                </div>

                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "20px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Phone Number"
                                    name="telephone"
                                    required
                                    id="standard-basic"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                    className="title"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Enter your title"
                                    name="name"
                                    required
                                    id="standard-basic"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="title"
                                  />
                                </div>
                              </div>

                              {/* DELEIVERY SECTION START */}

                              {/* PROMOTE YOUR ADDS SECTION  */}
                              <div className="delivery-parent">
                                <div className="text">
                                  <h1>Promote your ad</h1>
                                  <p>Please choose one of the following options to post your ad</p>
                                  <div className="standard" style={{ borderRadius: "20px" }}>
                                    <h1 style={{ fontSize: "16px" }}>Standard Ad</h1>
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
                                    By clicking on Post Ad, you accept the Terms of Use, confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div >
                    </form >
                  }
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
