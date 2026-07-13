package P11Salary;

public class P11EmployeeSalary {

	public static void main(String[] args) {
		
		/* 1. Brainstorming
		 *    -> Understand the problem
		 *    -> Edge cases, assumption, constraints, rules
		 *    -> Solution proposal
		 * 2. Code
		 * 3. Testing
		 * 4. Follow-up
		 * */
		
		/*Problem -> To calculate the employee
		 *        -> Basic salary,
		 *        -> Providant fund (deduction)
		 *        -> HRA (addition)
		 *        -> Tax (Deduction)
		 *        -> Loan (deduction)
		 *        -> Bonus (addition)
		 *		 * 
		 * */
		
		/*
		 * Solution:
	
		 * */
	
		
//		code
		
		double basicSalary = 100000 ;
		double PF = 10000 ;
		double hra = 20000 ;
		double tax = 12000 ;
		double loan = 25000 ;
		double bonus = 15000 ;
		
		double NetSalary = basicSalary + hra + bonus - PF - tax - loan ;
		
		System.out.println(NetSalary);
		
				

	}


}
