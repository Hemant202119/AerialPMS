package com.edios.cdf.config;

import java.beans.PropertyVetoException;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.mchange.v2.c3p0.ComboPooledDataSource;

@Configuration
@EnableTransactionManagement
@PropertySource(value = { "classpath:app/DBConfig.properties" })
public class JpaConfiguration {

	@Autowired
	private Environment environment;

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws IllegalStateException, PropertyVetoException {
		LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
		factoryBean.setDataSource(dataSource());
		factoryBean.setPackagesToScan(new String[] { "com.edios.cdf","com.edios.project" });
		factoryBean.setJpaVendorAdapter(jpaVendorAdapter());
		factoryBean.setJpaProperties(jpaProperties());
		return factoryBean;
	}

	@Bean
	public DataSource dataSource() throws IllegalStateException, PropertyVetoException {
		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		dataSource.setDriverClass(environment.getRequiredProperty("jdbc.driverClassName"));
		dataSource.setJdbcUrl(environment.getRequiredProperty("jdbc.url"));
		dataSource.setUser(environment.getRequiredProperty("jdbc.username"));
		dataSource.setPassword(environment.getRequiredProperty("jdbc.password"));
		dataSource.setIdleConnectionTestPeriod(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.idle_test_period")));
		dataSource.setInitialPoolSize(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.initialPoolSize")));
		dataSource.setCheckoutTimeout(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.timeout")));
		dataSource.setMaxPoolSize(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.max_size")));
		dataSource.setMinPoolSize(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.min_size")));
		dataSource.setMaxStatements(Integer.parseInt(environment.getRequiredProperty("hibernate.c3p0.max_statements")));
		return dataSource;
	}

	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);
		return transactionManager;
	}

	Properties jpaProperties() {
		Properties properties = new Properties();
		properties.put("hibernate.dialect", environment.getRequiredProperty("hibernate.dialect"));
		properties.put("hibernate.show_sql", environment.getRequiredProperty("hibernate.show_sql"));

	/*	properties.put("hibernate.c3p0.idle_test_period",
				environment.getRequiredProperty("hibernate.c3p0.idle_test_period"));
		properties.put("hibernate.c3p0.initialPoolSize",
				environment.getRequiredProperty("hibernate.c3p0.initialPoolSize"));
		properties.put("hibernate.c3p0.timeout", environment.getRequiredProperty("hibernate.c3p0.timeout"));
		properties.put("hibernate.c3p0.max_size", environment.getRequiredProperty("hibernate.c3p0.max_size"));
		properties.put("hibernate.c3p0.min_size", environment.getRequiredProperty("hibernate.c3p0.min_size"));
		properties.put("hibernate.c3p0.max_statements",
				environment.getRequiredProperty("hibernate.c3p0.max_statements"));*/

		return properties;
	}

	JpaVendorAdapter jpaVendorAdapter() {
		HibernateJpaVendorAdapter hibernateJpaVendor = new HibernateJpaVendorAdapter();
		return hibernateJpaVendor;
	}

	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}

	/*
	 * @Bean WebLogging logger() throws Exception { WebLogging logging = new
	 * WebLogging("AL", "userNotExistID", "app/AppConfiguration"); return logging; }
	 */
}
