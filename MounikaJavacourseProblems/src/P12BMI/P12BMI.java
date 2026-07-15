package P12BMI;

import java.util.Scanner;

public class P12BMI {

	public static void main(String[] args) {


		/*
		 * 1. Brainstorming
		 *   -> Assumptions, constraints, edge cases any other context information
		 *   -> Understanding the problem 
		 *   
		 *   BMI = weight in kg /(height in m)^2
		 *   < 18.5 ---> Under Weight
		 *   18.5 to 27 --> Normal Weight
		 *   27 to 35 --> Over weight
		 *   > 35 --> Obese 
		 *   
		 *   ------------- Men, Women, boys, girls, age  -------
		 *   
		 *   -> Tools
		 *   Scanner, Math.pow, If condition, println()
		 *   -> Solution proposal
		 *   
		 * 2. Code
		 *   -> code
		 *  		 *    
		 * 3. Test
		 * 4. Optimization
		 * 5. FollowUp  --> Different categories, ages, Measurement system */
		
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Enter the Weight in kg's: ");
		double weightKg = scanner.nextDouble();
		
		System.out.println("Enter the Height in cm: ");
		double heightKg = scanner.nextDouble();
		
		double BMI = weightKg/Math.pow(heightKg/100, 2) ;
		
		System.out.println("The BMI of the person is: "+BMI);
		
		if(BMI < 18.5 ){
			System.out.println("The person is Underweight");
			
		} else if (BMI < 27) {
			System.out.println("The person is Normalweight");
		} else if (BMI < 35) {
			System.out.println("The person is Overweight");
		} else {
			System.out.println("The person is Obese");
		}
		
		scanner.close();
	}

}
