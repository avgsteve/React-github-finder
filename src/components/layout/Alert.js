import React, { useContext } from 'react';
// import React, { useContext } from 'react';
// import AlertContext from '../../context/alert/alertContext';

const Alert = ({ alert }) => {

  return (

    alert !== null && (
      <div className={`alert alert-${alert.type}`}>

        <i className="fas fa-info-circle" alt="The font awesome icon" />

        {alert.msg}
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
