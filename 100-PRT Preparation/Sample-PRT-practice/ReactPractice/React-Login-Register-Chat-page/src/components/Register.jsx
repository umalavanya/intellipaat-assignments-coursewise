function Register(){
    return(
        <>
        <div className="container">
            <div className="container-title">Register</div>
            <form action="submit">
                {/* Username */}
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                    type="text"
                    name="userName"
                    value="username"
                    palceholder="enter your name"
                    required />
                </div>


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
                <div>Already have an account: </div>
            </form>

        </div>
        </>
    )
} ;

export default Register ;