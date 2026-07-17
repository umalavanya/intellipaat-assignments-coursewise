package com.practice.numbers;

import java.util.Scanner;

public class PerfectNumbers {

	public static void main(String[] args) {
		
		//Perfect Number  
		
		Scanner sc = new Scanner(System.in) ;
		
		int num = sc.nextInt() ;
		
		int sum = 0 ;	
		for(int i=1; i<num ; i++) {
			
			if(num%i == 0) {
				sum += i ;
				System.out.println(i);
			}		
		}
		
		if(sum == num) {
			System.out.println(num + " is a perfect number!!");
		} else {
			System.out.println(num + " is not a perfect number!!");
		}
		
		sc.close();
	}

}
