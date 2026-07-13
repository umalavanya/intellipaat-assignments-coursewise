package P10;

import java.util.Scanner;

public class P10ProfitLoss {

	public static void main(String[] args) {
		/*
		 * 1. Brainstorming 
		 *    --> Understand the problem
		 *    
		 *        -> To calculate the profit and loss
		 *        -> for profit, purchase price, selling price --> 
		 *    --> edge cases, assumptions, constraints
		 *    --> Propose solution
		 *    ---> variables --> purchasePrice  double
		 *                   --> sellingPrice double
		 *                   if else condition 
		 * 2.Code
		 * 3.Testing
		 * 4.Follow-up
		 * */	
//		code
		
		Scanner scanner = new Scanner(System.in) ;
		System.out.println("Enter the Purchasing Price: ");
		double purchasePrice = scanner.nextDouble();
		
		System.out.println("Enter the Selling Price: ");
		double sellingPrice = scanner.nextDouble();
		
		profitLoss(purchasePrice, sellingPrice) ;
		
		scanner.close();
	}
	
	
	public static void profitLoss(double PP, double SP) {
		
		double diff = PP - SP ;
		if (diff > 0) {
			System.out.println("Oops! There is a loss: "+ Math.abs(diff));
		} else if(diff == 0) {
			System.out.println("There is neither profit nor loss");
		} else {
			System.out.println("Hurray! The bussiness went well with the profit: "+Math.abs(diff));
		}
		
	}

}
