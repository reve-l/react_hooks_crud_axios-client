import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
//import Moment from 'moment';
//import dayjs from "dayjs";
import { CiSearch } from 'react-icons/ci'

const TutoList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [trouve, setTrouve] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    retrieveTutorials();
  }, []);

//console.log("test filtre: ",tutorials.filter(tuto=>tuto.title.toLowerCase().includes('t')))

  const retrieveTutorials = () => {
    TutorialService.getAll()
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {

   Swal.fire({
      title: 'Attention vider tous les Tutoriels',
      icon:'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Supprimer tout',
      denyButtonText: `Annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        TutorialService.removeAll()
        .then(response => {
          //console.log(response.data);
          Swal.fire('Tous ont été supprimés!', '', 'success')
          refreshList();
        })
        .catch(e => {
          console.log(e);
        });

      } else if (result.isDenied) {
        navigate("/tutorials");
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };

  
  
  


  return (

  <div className="list row">
    <div className="col-md-4"></div>
    <div className="col-md-8">
      <div className="mb-3  search-txt">
        <input
          type="text"
          className=""
          placeholder="Recherchez par le titre"
          value={searchQuery}
          onChange={ (e) => setSearchQuery(e.target.value) }
        />
        <CiSearch className="r-icon"/>
      </div>
    </div>
    

    <div className="col-md-4"></div>

    <div className="col-md-5">    
            <h4>Tutorials List</h4>

            <ul className="list-group">
              {/*console.log("formul",tutorials)*/}
              {/*setTrouve(tutorials.filter(tuto=>tuto.title.toLowerCase().includes(searchQuery)))*/}
              {tutorials &&
                
                tutorials.filter(tuto=>tuto.title.toLowerCase().includes(searchQuery))
                .map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>
            {console.log(trouve)}

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllTutorials}
            >
              Remove All
            </button>
    </div>

    <div className="col-md-3">
      {currentTutorial ? (
        <div>
          <h4>Tutorial</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentTutorial.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentTutorial.description}
          </div>
          <div>
            <label>
              <strong>Date création:</strong>
            </label>{" "}
            {new Date(currentTutorial.createdAt).toDateString()}
          </div>
          <div>
            <label>
              <strong>Date modif:</strong>
            </label>{" "}
            {new Date(currentTutorial.updatedAt).toDateString()}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentTutorial.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/tuto/" + currentTutorial.id}
            className="m-3 btn btn-sm btn-warning"
          >
            Edit
            <i class="fas fa-edit"></i>
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default TutoList;
