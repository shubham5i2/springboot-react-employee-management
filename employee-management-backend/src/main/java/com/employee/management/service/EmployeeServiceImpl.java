package com.employee.management.service;

import com.employee.management.entity.Employee;
import com.employee.management.exception.ResourceNotFoundException;
import com.employee.management.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public ResponseEntity<Employee> getEmployeeById(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));
        return ResponseEntity.ok(employee);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public ResponseEntity<Employee> updateEmployee(long id, Employee employeeUpdatedDetails) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));

        employee.setFirstName(employeeUpdatedDetails.getFirstName());
        employee.setLastName(employeeUpdatedDetails.getLastName());
        employee.setEmailId(employeeUpdatedDetails.getEmailId());

        employeeRepository.save(employee);

        return ResponseEntity.ok(employee);
    }

    @Override
    public ResponseEntity<Employee> deleteEmployee(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));
        employeeRepository.delete(employee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
