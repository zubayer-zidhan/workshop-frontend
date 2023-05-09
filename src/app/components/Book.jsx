import React from 'react';

const Book = () => {
  return (
    <div>
        <h1 className='text-8xl'>Book</h1>
        <form action="" method="post">
            <div className='mt-5'>
                <label className='mr-5 ml-3'>User ID</label>
                <input type="text" name="userID" id="" width={12}/>
            </div>
            <div className='mt-5'>
                <label className='mr-5 ml-3'>Workshop ID</label>
                <input type="text" name="wid" id="" width={12}/>
            </div>
            <div className='mt-5'>
                <label className='mr-5 ml-3'>Date</label>
                <input type="date" name="bdate" id="" width={12}/>
            </div>

        </form>
    </div>
    
  );
}

export default Book;