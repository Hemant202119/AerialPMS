package com.edios.cdf.dao.impl;

import java.util.List;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.UserProfileDao;
import com.edios.cdf.entity.security.AccountUserEntity;
import com.edios.cdf.entity.security.UserEntity;
import com.edios.cdf.entity.to.AccountUserEntityTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.cdf.entity.to.UserProfileTO;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.util.TransactionData;

@Repository
public class UserProfileDaoImpl extends BaseDaoImpl<AccountUserEntity> implements UserProfileDao {

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<UserProfileTO> fetchDefaultAccount(Long id) {
		List<UserProfileTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select DISTINCT ac.accountID as accountID, ac.accountName as accountName from AccountUserEntity a left join a.accountID as ac "
					+ "left join a.userID as u where u.userID=:userID ";
			userBean = session.createQuery(sqlQuery).setParameter("userID", id)
					.setResultTransformer(Transformers.aliasToBean(UserProfileTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<UserProfileTO> fetchDefaultRole(Long id) {
		List<UserProfileTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select DISTINCT ac.roleID as roleID, ac.roleName as roleName from AccountUserEntity a left join a.roleID as ac "
					+ "left join a.userID as u where u.userID=:userID";
			userBean = session.createQuery(sqlQuery).setParameter("userID", id)
					.setResultTransformer(Transformers.aliasToBean(UserProfileTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<UserProfileTO> fetchDefaultSite(Long id) {
		List<UserProfileTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select DISTINCT ac.siteID as siteID, ac.siteName as siteName from AccountUserEntity a left join a.siteID as ac "
					+ "left join a.userID as u where u.userID=:userID";
			userBean = session.createQuery(sqlQuery).setParameter("userID", id)
					.setResultTransformer(Transformers.aliasToBean(UserProfileTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}

	@Override
	public UserEntity fetchUserProfileInfo(PayloadBean payloadBean) {
		UserEntity userEntity = null;
		String sqlQuery = "";
		try {
			sqlQuery = "from  UserEntity as UE left join fetch UE.accountID as acc   where UE.userID=:userID and acc.accountID=:accountID ";
			userEntity = (UserEntity) entityManager.createQuery(sqlQuery).setParameter("userID", payloadBean.getId())
					.setParameter("accountID", payloadBean.getAccountId()).getSingleResult();
		} catch (NoResultException noResultException) {
			return null;
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return userEntity;
	}

	@Override
	public boolean updateUserProfile(UserEntity userEntity) {
		try {
			Session session = (Session) entityManager.getDelegate();
			session.update(userEntity);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<AccountUserEntityTO> fetchAccountDetails() {
		List<AccountUserEntityTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select ac.accountID as accountID, ac.accountName as accountName from AccountEntity ac where ac.recordType <> 'D' and ac.accountStatus='Active'";
			userBean = session.createQuery(sqlQuery)
					.setResultTransformer(Transformers.aliasToBean(AccountUserEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}
	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<AccountUserEntityTO> fetchRoleDetails() {
		List<AccountUserEntityTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select re.roleID as roleID,re.roleName as roleName from RoleEntity re where re.recordType <>'D' and re.roleStatus='Active'";
			userBean = session.createQuery(sqlQuery)
					.setResultTransformer(Transformers.aliasToBean(AccountUserEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<AccountUserEntityTO> fetchSiteDetails(Integer accountID) {
		List<AccountUserEntityTO> userBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select se.siteID as siteID,se.siteName as siteName from SiteEntity se where se.recordType <> 'D' and se.siteStatus='Active' and se.accountID.accountID=:accountID";
			userBean = session.createQuery(sqlQuery).setParameter("accountID", accountID)
					.setResultTransformer(Transformers.aliasToBean(AccountUserEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userBean;
	}

	@Override
	public Long addUser(UserEntity userEntity) {
		Session session = (Session) entityManager.getDelegate();
		Long pkOfUser = (Long) session.save(userEntity);
		return pkOfUser;

	}
	
	@Override
	public boolean checkUniqueLoginName(String userName, Long userID) {
		Session session = (Session) entityManager.getDelegate();
		try {
			String sqlQuery = "select user.loginName from UserEntity user where user.loginName=:userName and user.userID!=:userID ";
			return session.createQuery(sqlQuery).setParameter("userName", userName)
					.setParameter("userID", userID).getSingleResult() == null ? false: true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			return true;
		}
	}

	@Override
	public boolean checkUniqueLoginName(String userName) {
		Session session = (Session) entityManager.getDelegate();
		try {
			String sqlQuery = "select user.loginName from UserEntity user where user.loginName=:userName";
			return session.createQuery(sqlQuery).setParameter("userName", userName).getSingleResult() == null ? false
					: true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			return true;
		}
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<UserEntityTO> fetchUsers(String searchParameter) {

		Session session = (Session) entityManager.getDelegate();
		List<UserEntityTO> listOfUser = null;
		StringBuilder queryBuilder = null;
		try {
			queryBuilder = new StringBuilder();
			queryBuilder.append(
					"select user.userID as userID,user.transactionCount as transactionCount,user.loginName as loginName,user.firstName as firstName,user.lastName as lastName,user.emailAddress as emailAddress,user.userStatus as userStatus  from UserEntity user ");
			if (!searchParameter.equals("All")) {
				queryBuilder.append(" where user.userStatus=:userStatus and user.recordType<>'D' ");
				listOfUser = session.createQuery(queryBuilder.toString()).setParameter("userStatus", searchParameter)
						.setResultTransformer(Transformers.aliasToBean(UserEntityTO.class)).list();
			} else {
				queryBuilder.append(" where user.recordType<>'D' ");
				listOfUser = session.createQuery(queryBuilder.toString())
						.setResultTransformer(Transformers.aliasToBean(UserEntityTO.class)).list();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfUser;
	}

	@SuppressWarnings("deprecation")
	@Override
	public TransactionData fetchTransactionDataById(Long userID) {
		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select table.transactionCount as transactionCount,table.recordType as recordType "
					+ " from  UserEntity table where table.userID=:userID";
			transactionData = (TransactionData) session.createQuery(sqlQuery).setParameter("userID", userID)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}
}
