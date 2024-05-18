import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

function Goals() {
   
    
    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="content-wrapper" style={{ marginRight: '100px' }}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-purple">
                                        <div className="card-header">
                                            <h3 className="card-title">Goals</h3>
                                        </div>
                                        <form >
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="CurrentAccount">Goal Title</label>
                                                    <input type="text" name='GoalTitle' className='form-control roundend-0' />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ClientName">Amount</label>
                                                    <input type="numbers" placeholder='Amount' name='Amount' className='form-control roundend-0' />
                                                </div>
                                               <div className="form-group">
                                                   <label htmlFor="details">Deadline</label>
                                                   <input type="date" name="Deadline" className="form-control rounded-0" />
                                                </div>
                                                <div className="form-group">
                                                    <label for="important" class="form-label">Impact</label>
                                                    <input type="range" class="form-range" />
                                                </div>                                          
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Set Goal</button>
                                                </div>
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}



export default Goals;