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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { toast } from "react-toastify";
import "./Createads.scss";
import Footer from "../Components/Footer/Footer";

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
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangethree = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangefour = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangefive = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const Leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  return (
    <div>
      <Navbar />
      {/* form div in */}

      <Footer />
    </div>
  );
}

export default MyAccount;
