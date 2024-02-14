import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function SideBar({ show, handleClose, handleShow }) {
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="bg-blue-500 text-white">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
  </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="bg-gray-900 text-black">
        <Offcanvas.Header closeButton className="border-b border-gray-700">
          <Offcanvas.Title className="text-lg font-bold">Rigth Market</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="space-y-3">
            <Link to={'/AboutRigthMarket'}>
            <li className="text-xl font-semibold">About Right Market</li>
            </Link>

            <Link to={'/"/Terms"'}>
            <li className="text-xl font-semibold">Privacy Policies and Terms of Use</li>
 </Link>

 <Link to={'/WhyRigthMarket'}>
 <li className="text-xl font-semibold">Why Use Right Market?</li>
 </Link>

            
           
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;