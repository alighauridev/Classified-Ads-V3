import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import TextField from "@mui/material/TextField";
import Context from "../../Context/Context";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getCategories, postAd, postImages } from "../../http/Services";
import Textarea from "@mui/joy/Textarea";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { toast } from "react-toastify";
import "./Forms.scss";
import Footer from "../../Components/Footer/Footer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Frame from "../../assets/Frame 33.png";
import axios from "../../http/axiosSet";

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
const namestwo = ["Used", "New"];
const namesthree = ["Used", "New"];
const namesfour = ["1 year", "2 year"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Form() {
  const [value, setValue] = useState("1");
  const handleChangese = (event, newValue) => {
    setValue(newValue);
  };

  const [Category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [league, setLeague] = useState(null);
  const [Obj, setObj] = React.useState({});

  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setObj({ ...Obj, category: [event.target.value] });
  };

  const adPost = async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      let images = [];
      for (let i = 0; i < Obj.images.length; i++) {
        formData.append("files", Obj.images[i]);
      }
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
  const [personName, setPersonName] = React.useState([]);

  const Leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  return (
    <div>
      <Navbar />
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
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChangese}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Item One" value="1" />
                      <Tab label="Item Two" value="2" />
                      <Tab label="Item Three" value="3" />
                    </TabList>
                  </Box>
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
                              multiple
                              value={personName}
                              input={<OutlinedInput label="Name" />}
                              MenuProps={MenuProps}
                            >
                              {categories?.map((cat) => (
                                <MenuItem

                                >
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
                              multiple
                              value={personName}
                              input={<OutlinedInput label="Name" />}
                              MenuProps={MenuProps}
                            >
                              {namestwo.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                      {/* ================================ */}

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
                          style={{ display: "none" }}
                          id="select"
                        />
                        <div>
                          <p>Supported formats are .jpg, .gif and .png, 5MB max</p>
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
                    <form onSubmit={adPost} encType="multipart/form-data">
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
                                  style={{ textAlign: "end", color: "#FB5018" }}
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
                                  name="Enter Your title"
                                  required
                                  id="standard-basic"
                                  value={Obj.title}
                                  label="title"
                                  variant="standard"
                                  onChange={(event) => {
                                    setObj({
                                      ...Obj,
                                      title: event.target.value,
                                    });
                                  }}
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
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
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
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {namestwo.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
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
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {namesthree.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
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
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {namesfour.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="field-second">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Enter your Name"
                                      className="title"
                                      style={{ borderRadius: "20px" }}
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="number"
                                      className="title"
                                      placeholder="Enter your telephone number"
                                      id="standard-basic"
                                      value={tel1}
                                      label={
                                        Obj.telephone === "" ? "Tel1" : null
                                      }
                                      variant="standard"
                                      onChange={(event) => {
                                        setTel1(event.target.value);
                                      }}
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
                                    />
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
                                        Brands
                                      </InputLabel>
                                      <Select
                                        style={{ borderRadius: "20px" }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
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
                                    value={Obj.description}
                                    label={
                                      Obj.description === ""
                                        ? "description"
                                        : null
                                    }
                                    variant="standard"
                                    onChange={(event) => {
                                      setObj({
                                        ...Obj,
                                        description: event.target.value,
                                      });
                                    }}
                                    className="titletwo"
                                  />
                                </div>

                                <div
                                  style={{
                                    marginTop: "30px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <input
                                    type="file"
                                    multiple
                                    onChange={(e) =>
                                      setObj({ ...Obj, images: e.target.files })
                                    }
                                  />
                                </div>
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
                                        multiple
                                        value={personName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                      >
                                        {names.map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                              name,
                                              personName,
                                              theme
                                            )}
                                          >
                                            {name}
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
                                    Please, choose one of the following options
                                    to post your ad
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
      <Footer />
    </div>
  );
}

export default Form;
