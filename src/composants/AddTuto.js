import React, { useState } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../validation/validation";


const AddTuto = () => {

  const initialTutorialState = {
    id: null,
    title: "",
    nbpage:"",
    description: "",
    auteur:"",
    published: false,
    dateEdit:new Date()
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
 // const [fromDate, setFromDate] = useState(new Date())

  let navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      nbpage: tutorial.nbpage,
      description: tutorial.description,
      auteur: tutorial.auteur,
      dateEdit: tutorial.dateEdit
//      dateEdit: fromDate,
    };
    TutorialService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        Swal.fire({
          title: 'Success!',
          text: 'Enregistré',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        navigate("/tutorialslist");
        //setSubmitted(true);
        //console.log(response.data);
        //console.log("CREATE: ",data);


      })
      .catch(e => {
        console.log(e);
      });
    };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };




  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });
  //const { errors } = formState;
  //console.log("FORMSTAT",errors);


  return (
    <div className="submit-form">
      <form onSubmit={handleSubmit(saveTutorial)}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success m-3" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h3>Nouveau Tuto</h3>
          <div className="form-group">
            <label htmlFor="title" className="mt-3">Title</label>
            <input
            {...register("title")}
              type="text"
              className="form-control"
              id="title"
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
            <small className="text-danger">{errors.title?.message}</small>

          </div>


          <div className="form-group">
            <label htmlFor="auteur" className="mt-3">Auteur</label>
            <input
              {...register("auteur")}
              type="text"
              className="form-control"
              id="auteur"
              value={tutorial.auteur}
              onChange={handleInputChange}
              name="auteur"
            />
            <small className="text-danger">{errors.auteur?.message}</small>
          </div>


          <div className="form-group">
            <label htmlFor="nbpage" className="mt-3">Nombre de page</label>
            <input
            {...register("nbpage")}
              type="text"
              className="form-control"
              id="nbpage"
              value={tutorial.nbpage}
              onChange={handleInputChange}
              name="nbpage"
            />
            <small className="text-danger">{errors.nbpage?.message}</small>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="mt-3">Description</label>
            <input
            {...register("description")}
              type="text"
              className="form-control"
              id="description"
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
            <small className="text-danger">{errors.description?.message}</small>

          </div>

          <div className="form-group">
            <label htmlFor="datedit" className="mt-3">Date édition</label>
            <input
            {...register("dateEdit")}
              type="date"
              className="form-control"
              id="datedit"
              value={tutorial.dateEdit}
              onChange={/*(e)=>setFromDate(e.target.value)*/ handleInputChange}
              name="dateEdit"
            />
            <small className="text-danger">{errors.dateEdit?.message}</small>

          </div>
          <input type="submit" value="Submit" className="btn btn-lg btn-success mt-5 w-100"/>

            {/**
                       <button onClick={saveTutorial} className="btn btn-success m-3">
                        Submit
                      </button>
            */}

        </div>
      )}
      </form>
    </div>
  )
};

export default AddTuto;
