package com.employee.management.service;

import com.employee.management.entity.Employee;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EmployeeService {

    public List<Employee> getAllEmployees();

    public ResponseEntity<Employee> getEmployeeById(long id);

    public Employee createEmployee(Employee employee);

    public ResponseEntity<Employee> updateEmployee(long id, Employee employeeUpdatedDetails);

    public ResponseEntity<Employee> deleteEmployee(long id);
}
