import React from 'react';
import { Link } from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h2>Ecommerce</h2>
      </Link>

      <Link to="/admin/dashboard">
        <p className='d-flex gap-2'>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <TreeView>
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>
          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>

      <Link to="/admin/orders">
        <p className='d-flex gap-2'>
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p className='d-flex gap-2'>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p className='d-flex gap-2'>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
