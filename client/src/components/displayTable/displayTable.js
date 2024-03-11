import './table.css'

function DisplayTable({data}){
  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);

  data.sort((a,b)=>a.date-b.date)
  return <center>
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr' key={-1}>{
          dataColumns.map((prop,idx)=><th className='qth' key={idx+'+'}>{prop+' '}</th>)
        }</tr></thead>
        <tbody className='qtbody'>{
          data.map((val,idx) => <>
            <tr className='qtr' key={idx}>{
              dataColumns.map((prop,i)=>
                <td key={idx+'-'+i}>
                  {val[prop]}
                </td>)
            }</tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  </center>
}

export default DisplayTable;