// Code generated by mockery v2.42.2. DO NOT EDIT.

// Regenerate this file using `make store-mocks`.

package mocks

import (
	model "github.com/mattermost/mattermost/server/public/model"
	mock "github.com/stretchr/testify/mock"
)

// AuditStore is an autogenerated mock type for the AuditStore type
type AuditStore struct {
	mock.Mock
}

// BatchMergeUserId provides a mock function with given fields: toUserId, fromUserId
func (_m *AuditStore) BatchMergeUserId(toUserId string, fromUserId string) error {
	ret := _m.Called(toUserId, fromUserId)

	if len(ret) == 0 {
		panic("no return value specified for BatchMergeUserId")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(string, string) error); ok {
		r0 = rf(toUserId, fromUserId)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Get provides a mock function with given fields: user_id, offset, limit
func (_m *AuditStore) Get(user_id string, offset int, limit int) (model.Audits, error) {
	ret := _m.Called(user_id, offset, limit)

	if len(ret) == 0 {
		panic("no return value specified for Get")
	}

	var r0 model.Audits
	var r1 error
	if rf, ok := ret.Get(0).(func(string, int, int) (model.Audits, error)); ok {
		return rf(user_id, offset, limit)
	}
	if rf, ok := ret.Get(0).(func(string, int, int) model.Audits); ok {
		r0 = rf(user_id, offset, limit)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(model.Audits)
		}
	}

	if rf, ok := ret.Get(1).(func(string, int, int) error); ok {
		r1 = rf(user_id, offset, limit)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PermanentDeleteByUser provides a mock function with given fields: userID
func (_m *AuditStore) PermanentDeleteByUser(userID string) error {
	ret := _m.Called(userID)

	if len(ret) == 0 {
		panic("no return value specified for PermanentDeleteByUser")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(string) error); ok {
		r0 = rf(userID)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Save provides a mock function with given fields: audit
func (_m *AuditStore) Save(audit *model.Audit) error {
	ret := _m.Called(audit)

	if len(ret) == 0 {
		panic("no return value specified for Save")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*model.Audit) error); ok {
		r0 = rf(audit)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewAuditStore creates a new instance of AuditStore. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewAuditStore(t interface {
	mock.TestingT
	Cleanup(func())
}) *AuditStore {
	mock := &AuditStore{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
