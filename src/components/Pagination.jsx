import Pagination from '@mui/material/Pagination';

// eslint-disable-next-line react/prop-types
export default function BasicPagination({count,setStartInd,setLastInd}) {
    // const [currentPage,setCurrentPage]=useState(1)
  return (
    <div  className=' flex justify-center mt-10 w-[100%]'>
        <Pagination
        boundaryCount={1}
        size='small'
        defaultPage={1}
        onChange={(event,page)=>{
            setStartInd(page*8-8)
            setLastInd(page*8)
        }}
        
        count={count} />
    </div>
  );
}