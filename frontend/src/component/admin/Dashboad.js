import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboad = () => {
  return (
    <div className='admin-dashboard'>
      <div className='admin-sidebar-wrapper'>
        <Sidebar />
      </div>
      <div className='admin-content-wrapper'>
        <div className='dashboard-content'>
          <h2>Dashboard</h2>
          <div className='dashboard-main-content'>
            {/* Add your dashboard content here */}
            <div style={{ minHeight: '1000px' }}>
              <p>Admin dashboard content goes here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboad;
