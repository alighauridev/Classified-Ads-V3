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
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast } from "react-toastify";
import "./Createads.scss";
import Footer from '../Components/Footer/Footer'







// MATERIAL UI =========================


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

const names = [
  'nike',
  'addida',
  'Bata',

];
const namestwo = [
  'Used',
  'New',
];
const namesthree = [
  'Used',
  'New',
];
const namesfour = [
  '1 year',
  '2 year',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}








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


  // MATERIAL UI ============================

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangetwo = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangethree = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangefour = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangefive = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };





  const Leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  return (
    <div>
      <Navbar />
      {/* form div in */}
      <form onSubmit={adPost} encType="multipart/form-data">
        <div className="post-back">
          <div className="postad-paretn">
            <div>
              <div className="post-ad-back-sec">
                <div>
                  <h3 style={{ textAlign: "start", color: '#FB5018' }}>Back</h3>
                </div>
                <div>
                  <h3>Post Ad</h3>
                </div>
                <div>
                  <h3 style={{ textAlign: "end", color: '#FB5018' }}>Clear</h3>
                </div>
              </div>
              <div>


                {/* REQUIRMENT FIELDS SECTION START HERE */}




                <div className="text-filed-back">

                  <input type="text" placeholder="Enter your title" name="Enter Your title" required
                    id="standard-basic"
                    value={Obj.title}
                    label="
                  title"
                    variant="standard"
                    onChange={(event) => {
                      setObj({ ...Obj, title: event.target.value });
                    }} className="title"
                  />



                  {/* ADDITION MATERIAL UI */}







                  <div className="field-first">
                    <div style={{borderRadius:'20px'}}>
                      <FormControl sx={{ m: 1, width: 300 }} className="formcontrol">
                        <InputLabel id="demo-multiple-name-label" className="labelc">Brands</InputLabel>
                        <Select style={{borderRadius:'20px'}}
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChangetwo}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
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


                    <div>
                      <FormControl sx={{ m: 1, width: 300 }} className="formcontrol">
                        <InputLabel id="demo-multiple-name-label" className="labelc" >Type</InputLabel>
                        <Select style={{borderRadius:'20px'}}
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-namet"
                          multiple
                          value={personName}
                          onChange={handleChangethree}
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


                  <div className="field-first">
                    <div>
                      <FormControl sx={{ m: 1, width: 300 }} className="formcontrol">
                        <InputLabel id="demo-multiple-name-label" className="labelc">Conditions</InputLabel>
                        <Select style={{borderRadius:'20px'}}
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChangefour}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {namesthree.map((name) => (
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


                    <div>
                      <FormControl sx={{ m: 1, width: 300 }} className="formcontrol">
                        <InputLabel id="demo-multiple-name-label" className="labelc">Warranty</InputLabel>
                        <Select style={{borderRadius:'20px'}}
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-namet"
                          multiple
                          value={personName}
                          onChange={handleChangefive}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {namesfour.map((name) => (
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

















                  <div className="description">
                    <input type="textarea" style={{borderRadius:'20px'}}
                      placeholder="Description"
                      id="standard-basic"
                      defaultValue="
                  Enter Description"
                      minRows={2}
                      required
                      value={Obj.description}
                      label={Obj.description == "" ? "description" : null}
                      variant="standard"
                      onChange={(event) => {
                        setObj({ ...Obj, description: event.target.value });
                      }} className="titletwo"
                    />
                  </div>







                  {/* <TextField
                    id="standard-basic"
                    value={Obj.price}
                    label={Obj.price == "" ? "price" : null}
                    variant="standard"
                    onChange={(event) => {
                      setObj({ ...Obj, price: parseInt(event.target.value) });
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    value={Obj.Location}
                    label={Obj.Location == "" ? "Location" : null}
                    variant="standard"
                    onChange={(event) => {
                      setObj({ ...Obj, Location: event.target.value });
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    value={tel1}
                    label={Obj.telephone == "" ? "Tel1" : null}
                    variant="standard"
                    onChange={(event) => {
                      setTel1(event.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label={Obj.telephone == "" ? "Tel2" : null}
                    variant="standard"
                    onChange={(event) => {
                      setTel2(event.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    // value={Obj.telephone[2]}
                    label={Obj.telephone == "" ? "Tel3" : null}
                    variant="standard"
                    onChange={(event) => {
                      setTel3(event.target.value);
                    }}
                  /> */}
                  {/* add input for file type */}

                  {/* <div>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
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
                    <FormControl variant="standard">
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

                    <div>
                      Note: You can select multiple categories by clicking on
                      it. You can also deselect them by clicking again above
                    </div>
                  </div> */}
         
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



                {/* DELEIVERY SECTION START */}


                <div className="delivery-parent">

                  <div className="text">
                    <h1>
                      delivery
                    </h1>
                    <div>
                      <FormControl sx={{ m: 1, width: 300 }} className="formcontrol">
                        <InputLabel id="demo-multiple-name-label" className="labelc">Add Delivery Options</InputLabel>
                        <Select style={{borderRadius:'20px'}}
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChangetwo}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
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
                </div>



                {/* PROMOTE YOUR ADDS SECTION  */}

                <div className="delivery-parent">

                  <div className="text">
                    <h1>
                      Promote your ad
                    </h1>
                    <p>Please, choose one of the following options to post your ad</p>
                    <div className="standard" style={{borderRadius:'20px'}}>
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
                    <p>By clicking on Post Ad, you accept the Terms of Use , confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  );
}

export default MyAccount;
