import React from 'react';
// import React, { useContext } from 'react';
// import AlertContext from '../../context/alert/alertContext';

import { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = (
  // { displayConfigs }
) => {
  //configs is the alertConfig obj from state in App.js

  const alertContext = useContext(AlertContext);

  const { alertConfig } = alertContext;

  return (
    alertConfig !== null && ( // When alert !== null is true and 

      <div className={`alert alert-${alertConfig.type}`}>

        <i className="fas fa-info-circle" alt="The font awesome icon" />

        {alertConfig.msg}

      </div>
    )

  );


  // return (
  //   displayConfigs !== null && ( // When alert !== null is true and 

  //     <div className={`alert alert-${displayConfigs.type}`}>

  //       <i className="fas fa-info-circle" alt="The font awesome icon" />

  //       {displayConfigs.msg}

  //     </div>
  //   )

  // );

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
