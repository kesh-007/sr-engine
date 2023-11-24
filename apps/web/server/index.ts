const url= 'http://192.168.137.239:8000'

export const loginApi = async (email:string, password:string) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Network Error');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in loginApi:', error);
      throw error; 
    }
  }


  export const TestDetailsApi = async(test_name:string) =>{

    const response =  await fetch(`${url}/test-results`,{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({test_name})})

        if (!response.ok) {
            throw new Error('Network Error');
          }
          const data = await response.json();
          return data;
    
    

    }    


    

export const ChangePasswordApi  = async(newPassword:string) =>
{
    const response = await fetch(`${url}/change-password`,{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({newPassword,Name:'admin'})})
        if (!response.ok) {
            throw new Error('Network Error');
          }
          const data = await response.json();
          return data;




}

export const TopPerformersApi = async (count:number)=>{

    const response = await fetch(`${url}/top-performers`,{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({count})})
        if (!response.ok) {
            throw new Error('Network Error');
          }
          const data = await response.json();
          return data;
}

export const postFormDataApi = async (formData:FormData) => {
  try {
    const response = await fetch(`${url}/form-data`, {
      method: 'POST',
      body: formData, 
    });

    if (!response.ok) {
      console.log(response,'idu dan da response');
      throw new Error('Network Error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GetAlltests = async () => {
  try {
    const response = await fetch(`${url}/all-test`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network Error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

