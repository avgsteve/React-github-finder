import React from 'react';
// import React, { useContext } from 'react';
// import AlertContext from '../../context/alert/alertContext';

const Alert = ({ configs }) => {

  //configs is the alertConfig obj from state in App.js

  return (
    configs !== null && ( // When alert !== null is true and 

      <div className={`alert alert-${configs.type}`}>

        <i className="fas fa-info-circle" alt="The font awesome icon" />

        {configs.msg}

      </div>
    )

  );

};


// const Alert = () => {
//   const alertContext = useContext(AlertContext);

//   const { alert } = alertContext;

//   return (
//     alert !== null && (
//       <div className={`alert alert-${alert.type}`}>
//         <i className='fas fa-info-circle' /> {alert.msg}
//       </div>
//     )
//   );
// };


export default Alert;
