function Login(){
    return(
        <>
        <div className="container">
            <div className="container-title">Login </div>
            <form action="submit">

                {/* Username */}
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                    type="text"
                    name="email"
                    value="email"
                    palceholder="email"
                    required />
                </div>


                {/* Username */}
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                    type="password"
                    name="password"
                    value="password"
                    palceholder="**********"
                    required />
                </div>

                <button className="submitBtn">Submit</button>
                <div>Don't have an account: </div>
            </form>
        </div>
        </>
    )
} ;

export default Login ;